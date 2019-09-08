import { Repository, In } from 'typeorm';
import { Place } from './place.entity';
import { Service } from 'typedi';
import { Visit } from '../visit/visit.entity';
import { round } from '../../utils';
import { FoursquareService } from '../../services/foursquare/foursquare.service';
import { User } from '../user/user.entity';
import { InjectRepository } from 'typeorm-typedi-extensions';
// import { TagService } from './tag/tag.service';

@Service()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    @InjectRepository(Visit)
    private readonly visitRepository: Repository<Visit>,
    private readonly foursquareService: FoursquareService // private readonly tagService: TagService
  ) {}

  async getAverageScore(id: number) {
    const visits = await this.visitRepository.find({
      where: { placeId: id }
    });

    if (!visits.length) {
      return 0;
    }

    // const averageScore =
    //   visits.reduce((score, visit) => score + visit.ratings.score, 0) /
    //   visits.length;

    const rounded = round(5.5);

    return rounded;
  }

  async getVisitCount(id: number) {
    const visitCount = await this.visitRepository.count({
      where: { placeId: id }
    });

    return visitCount;
  }

  async getVisits(id: number, { limit }: { limit?: number }) {
    const visits = await this.visitRepository.find({
      where: { placeId: id },
      take: limit
    });

    return visits;
  }

  // async findByIdOrSlug(id?: number, providerId?: string) {
  //   const place = await this.placeRepository.findOne({
  //     where: [{ id }, { foursquareId: providerId }]
  //   });

  //   if (!place) {
  //     return null;
  //   }

  //   return place;
  // }

  async findByProviderId(providerId: string) {
    const place = await this.placeRepository.findOne({
      where: { foursquareId: providerId }
    });

    if (!place) {
      return null;
    }

    return place;
  }

  async getPlaceData(providerId: string) {
    return this.foursquareService.venue.details(providerId);
  }

  async findByIdOrCreate(providerId: string, user: User) {
    const place = await this.placeRepository.findOne({
      where: { foursquareId: providerId }
    });

    if (place) {
      return place;
    }

    return this.createPlace(providerId, user);
  }

  async createPlace(providerId: string, user: User) {
    // const { name, location } = await this.getPlaceData(providerId);

    const createdPlace = this.placeRepository.create({
      user,
      foursquareId: providerId
      // slug: slugify(`${name} ${location.address} ${location.city} ${user.id}`)
    });

    await this.placeRepository.save(createdPlace);

    return createdPlace;
  }

  async findById(id: number) {
    const place = await this.placeRepository.findOne(id);
    return place;
  }

  async getUserPlacesByProviderIds(userId: number, ids: string[]) {
    return this.placeRepository.find({
      where: {
        userId,
        foursquareId: In(ids)
      }
    });
  }
}
