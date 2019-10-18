import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { WantToVisit } from './wantToVisit.entity';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.entity';
import { logger } from '../../../utils/logger';

@Service()
export class WantToVisitService {
  constructor(
    @InjectRepository(WantToVisit)
    private readonly wtvRepository: Repository<WantToVisit>,
    private readonly userService: UserService
  ) {}

  async toggle(placeProviderId: string, userId: number) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Error('No user found');
    }

    const exists = await this.findByProviderId(placeProviderId, userId);

    if (exists) {
      await this.remove(placeProviderId, user);
      return false;
    }

    await this.add(placeProviderId, user);
    return true;
  }

  async remove(providerId: string, user: User) {
    const exists = await this.findByProviderId(providerId, user.id);

    if (exists) {
      logger.info('Want to visit removed', { wantToVisit: exists.id });
      return this.wtvRepository.remove(exists);
    }

    return null;
  }

  async add(providerId: string, user: User) {
    const wantToVisit = this.wtvRepository.create({
      placeProviderId: providerId,
      user,
      userId: user.id
    });

    return this.wtvRepository.save(wantToVisit);
  }

  async setVisited(providerId: string, user: User) {
    const place = await this.findByProviderId(providerId, user.id);

    if (place) {
      await this.wtvRepository.update(place.id, { visited: true });
      return true;
    }

    return false;
  }

  async findByProviderId(providerId: string, userId: number) {
    return this.wtvRepository.findOne({
      where: { placeProviderId: providerId, userId }
    });
  }

  async getAllByUser(userId: number) {
    return this.wtvRepository.find({
      where: { userId }
    });
  }
}
