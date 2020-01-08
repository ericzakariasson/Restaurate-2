import { Service } from 'typedi';
import { In, Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { logger, round } from '../../utils';
import { Place } from '../place/place.entity';
import { PlaceService } from '../place/place.service';
import { WantToVisitService } from '../place/wantToVisit/wantToVisit.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { VisitImage } from './image/visit.image.entity';
import { Order } from './order/order.entity';
import { Rate } from './rate/rate.entity';
import { RateInput } from './rate/rate.types';
import { Visit } from './visit.entity';
import { AddVisitInput, EditVisitInput } from './visit.types';

@Service()
export class VisitService {
  constructor(
    @InjectRepository(Visit)
    private readonly visitRepository: Repository<Visit>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Rate)
    private readonly rateRepository: Repository<Rate>,
    @InjectRepository(VisitImage)
    private readonly visitImageRepository: Repository<VisitImage>,
    private readonly wtvService: WantToVisitService,
    private readonly userService: UserService,
    private readonly placeService: PlaceService
  ) {}

  async findById(id: string | number) {
    return this.visitRepository.findOne(id);
  }

  private calculateScore(ratings: Rate[]) {
    const score = round(
      ratings.reduce((total: number, rate: Rate) => (total += rate.score), 0) /
        ratings.length
    );

    return score;
  }

  async createVisit(input: AddVisitInput, place: Place, user: User) {
    const orders = input.orders
      ? await this.createOrders(input.orders, user)
      : [];

    const images = input.images.map(
      image =>
        new VisitImage({
          placeProviderId: input.providerPlaceId,
          url: image.url,
          publicId: image.publicId,
          orders: orders.filter(order => image.orders.includes(order.title)),
          user,
          userId: user.id
        })
    );

    const ratings = await this.createRatings(input.ratings);

    const score = this.calculateScore(ratings);

    const visit = this.visitRepository.create({
      ...input,
      orders,
      place,
      placeId: place.id,
      user,
      score,
      userId: user.id,
      ratings,
      private: input.isPrivate,
      takeAway: input.isTakeAway,
      images
    });

    await this.wtvService.setVisited(place.providerId, user);

    logger.info('Visit created', { visit: visit.id });

    return await this.visitRepository.save(visit);
  }

  async deleteVisit(id: string | number, userId: number) {
    const user = await this.userService.findById(userId);

    if (!user) {
      logger.error('No user found', { user: userId });
      throw new Error('No user found');
    }

    const visit = await this.findById(id);

    if (!visit) {
      logger.error('No visit found', { visit: id });
      throw new Error('No visit found');
    }

    if (visit.userId !== user.id) {
      throw new Error('You do not own this visit');
    }

    const ratings = await this.rateRepository.find({
      where: { visitId: visit.id }
    });

    const orders = await this.orderRepository.find({
      where: { visitId: visit.id }
    });

    await this.rateRepository.remove(ratings);
    await this.orderRepository.remove(orders);
    await this.visitRepository.delete(visit.id);

    logger.info('Visit deleted', { visit: visit.id, user: user.id });

    return true;
  }

  async editVisit(input: EditVisitInput, user: User) {
    if (!input.ratings) {
      throw new Error('Can not set ratings to nothing');
    }

    const visit = await this.visitRepository.findOne(input.visitId);

    if (!visit) {
      return null;
    }

    if (visit.userId !== user.id) {
      throw new Error(
        `User ${user.id} tried to edit visit ${visit.id} without permission`
      );
    }

    const place = await this.placeService.findById(visit.placeId);

    if (!place) {
      return null;
    }

    const ordersToCreate = input.orders.filter(
      title => !visit.orders.some(o => o.title === title)
    );

    const ordersToDelete = visit.orders.filter(
      order => !input.orders.some(title => title === order.title)
    );

    await this.createOrders(ordersToCreate, user, visit);
    await this.orderRepository.remove(ordersToDelete);

    const imagesToCreate = input.images.filter(
      image => !visit.images.some(i => i.publicId === image.publicId)
    );

    const imagesToDelete = visit.images.filter(
      image => !input.images.some(i => i.publicId === image.publicId)
    );

    await Promise.all(
      imagesToCreate.map(async i => {
        const orders =
          i.orders.length > 0
            ? await this.orderRepository.find({
                where: {
                  visitId: visit.id,
                  title: In(i.orders)
                }
              })
            : [];

        const image = new VisitImage({
          orders,
          placeProviderId: place.providerId,
          publicId: i.publicId,
          url: i.url,
          user,
          userId: user.id,
          visit,
          visitId: visit.id
        });

        await this.visitImageRepository.save(image);
      })
    );

    await this.visitImageRepository.remove(imagesToDelete);

    const ratingsToCreate = input.ratings.filter(
      ir => !visit.ratings.some(rate => rate.name === ir.name)
    );

    const ratingsToUpdate = visit.ratings.filter(rate =>
      input.ratings.some(ir => ir.name === rate.name)
    );

    const ratingsToDelete = visit.ratings.filter(
      rate => !input.ratings.some(ir => ir.name === rate.name)
    );

    await Promise.all(
      ratingsToUpdate.map(async rate => {
        const inputRate = input.ratings.find(ir => ir.name === rate.name);
        if (inputRate) {
          await this.rateRepository.update(rate.id, { score: inputRate.score });
        }
      })
    );

    await this.createRatings(ratingsToCreate, visit);

    await this.rateRepository.remove(ratingsToDelete);

    const updatedVisit = await this.visitRepository.findOne(visit.id);

    if (!updatedVisit) {
      return null;
    }

    const score = this.calculateScore(updatedVisit.ratings);

    await this.visitRepository.update(updatedVisit.id, {
      score,
      comment: input.comment,
      visitDate: input.visitDate,
      private: input.isPrivate,
      takeAway: input.isTakeAway
    });

    return this.visitRepository.findOne(updatedVisit.id);
  }

  private async createOrders(
    ordersToCreate: string[],
    user: User,
    visit?: Visit
  ) {
    return await Promise.all(
      ordersToCreate.map(async title => {
        const created = this.orderRepository.create({
          title,
          user,
          ...(visit && {
            visit,
            visitId: visit.id
          })
        });
        await this.orderRepository.save(created);
        return created;
      })
    );
  }

  private async createRatings(ratings: RateInput[], visit?: Visit) {
    return await Promise.all(
      ratings.map(async rating => {
        const parent = this.rateRepository.create({
          ...rating,
          ...(visit && {
            visit,
            visitId: visit.id
          })
        });
        await this.rateRepository.save(parent);
        if (rating.children) {
          await Promise.all(
            rating.children.map(async child => {
              const createdChild = this.rateRepository.create({
                ...child,
                parentId: parent.id,
                ...(visit && {
                  visit,
                  visitId: visit.id
                })
              });
              await this.rateRepository.save(createdChild);
            })
          );
        }
        return parent;
      })
    );
  }

  async getVisitsByUserId(userId: number): Promise<Visit[]> {
    return this.visitRepository
      .createQueryBuilder('visit')
      .select('*')
      .where('visit.userId = :userId', { userId })
      .orderBy('visit.visitDate', 'DESC')
      .getRawMany();
  }
}
