import { Repository, In } from 'typeorm';
import { Place } from './place.entity';
import { Service } from 'typedi';
import { Visit } from '../visit/visit.entity';
import { round } from '../../utils';
import { FoursquareService } from '../../services/foursquare/foursquare.service';
import { User } from '../user/user.entity';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { UserService } from '../user/user.service';
import { PriceLevel } from './place.types';
import { CacheService } from '../../services/cache/cache.service';
import { VenueDetails } from '../../services/foursquare/types';
import { TagService } from './tag/tag.service';
import { WantToVisit } from './wantToVisit/wantToVisit.entity';
// import { TagService } from './tag/tag.service';

const placeDataKey = (key: string) => `placeData_${key}`;

@Service()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    @InjectRepository(Visit)
    private readonly visitRepository: Repository<Visit>,
    @InjectRepository(WantToVisit)
    private readonly wtvRepository: Repository<WantToVisit>,
    private readonly userService: UserService,
    private readonly tagService: TagService,
    private readonly foursquareService: FoursquareService,
    private readonly cacheService: CacheService
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
    const cached = this.cacheService.get<VenueDetails>(
      placeDataKey(providerId)
    );

    if (cached) {
      return cached;
    }

    const placeData = await this.foursquareService.venue.details(providerId);
    const success = this.cacheService.set(placeDataKey(providerId), placeData);

    if (!success) {
      console.error(`Error setting cache for "${providerId}"`);
    }

    return placeData;
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
    const createdPlace = this.placeRepository.create({
      user,
      userId: user.id,
      foursquareId: providerId
    });

    return this.placeRepository.save(createdPlace);
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

  async setPriceLevel(
    providerId: string,
    priceLevel: PriceLevel,
    userId: number
  ) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Error('No user found');
    }

    const place = await this.findByIdOrCreate(providerId, user);
    await this.placeRepository.update(place.id, { priceLevel });

    return priceLevel;
  }

  async addTag(providerId: string, name: string, userId: number) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Error('No user found');
    }

    const place = await this.findByIdOrCreate(providerId, user);
    const tag = await this.tagService.findByNameOrCreate(name, place, user);

    place.tags = place.tags ? place.tags.concat(tag) : [tag];

    await this.placeRepository.save(place);

    return tag;
  }

  async removeTag(providerId: string, tagId: number, userId: number) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Error('No user found');
    }

    const place = await this.findByIdOrCreate(providerId, user);
    place.tags = place.tags.filter(tag => tag.id !== tagId);

    await this.placeRepository.save(place);

    return tagId;
  }

  async setComment(providerId: string, comment: string, userId: number) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Error('No user found');
    }

    const place = await this.findByIdOrCreate(providerId, user);
    place.comment = comment;

    await this.placeRepository.save(place);

    return comment;
  }

  async getWantToVisitList(userId: number) {
    const wantToVisit = await this.wtvRepository.find({ where: { userId } });

    const places = Promise.all(
      wantToVisit.map(async wtv => await this.getPlaceData(wtv.providerId))
    );

    return places;
  }
}
