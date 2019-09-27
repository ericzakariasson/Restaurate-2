import { Repository, In } from 'typeorm';
import { Place } from './place.entity';
import { Service } from 'typedi';
import { Visit } from '../visit/visit.entity';
import { round } from '../../utils';
import { User } from '../user/user.entity';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { UserService } from '../user/user.service';
import { PriceLevel, PlaceDetails, PlaceType } from './place.types';
import { CacheService } from '../../services/cache/cache.service';
import { TagService } from './tag/tag.service';
import { WantToVisit } from './wantToVisit/wantToVisit.entity';
import { HereService } from '../../services/here/here.service';
import {
  transformProviderSearchItem,
  transformProviderDetails
} from './place.helpers';
import { Coordinates } from '../../utils/utils.types';
import { logger } from '../../utils/logger';

const placeDetailsKey = (key: string) => `placeDetails:providerId:${key}`;

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
    private readonly cacheService: CacheService,
    private readonly hereService: HereService
  ) {}

  async getAverageScore(id: number) {
    const visits = await this.visitRepository.find({
      where: { placeId: id }
    });

    if (!visits.length) {
      return 0;
    }

    const averageScore =
      visits.reduce((score, visit) => score + visit.score, 0) / visits.length;

    const rounded = round(averageScore);

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
      take: limit,
      order: {
        visitDate: 'DESC',
        createdAt: 'DESC'
      }
    });

    return visits;
  }

  async findByProviderId(providerId: string, userId: number) {
    const place = await this.placeRepository.findOne({
      where: {
        providerId,
        userId
      }
    });

    if (!place) {
      return null;
    }

    return place;
  }

  async getPlaceDetails(providerId: string) {
    const cached = await this.cacheService.getJSON<PlaceDetails>(
      placeDetailsKey(providerId)
    );

    if (cached) {
      return cached;
    }

    const data = await this.hereService.details(providerId);
    const placeDetails = transformProviderDetails(data);

    const success = await this.cacheService.setJSON(
      placeDetailsKey(providerId),
      placeDetails
    );

    if (!success) {
      logger.error(`Error setting cache for "${providerId}"`);
    }

    return placeDetails;
  }

  async findByIdOrCreate(providerPlaceId: string, user: User) {
    const place = await this.findByProviderId(providerPlaceId, user.id);

    if (place) {
      return place;
    }

    return this.createPlace(providerPlaceId, user);
  }

  async createPlace(providerPlaceId: string, user: User) {
    const wtv = await this.wtvRepository.findOne({
      where: {
        providerPlaceId,
        userId: user.id
      }
    });

    if (wtv) {
      await this.wtvRepository.remove(wtv);
    }

    const createdPlace = this.placeRepository.create({
      user,
      userId: user.id,
      providerId: providerPlaceId
    });

    logger.info('Place created', { place: createdPlace.id });

    return this.placeRepository.save(createdPlace);
  }

  async findById(id: number) {
    const place = await this.placeRepository.findOne(id);
    return place;
  }

  async getUserPlacesByProviderIds(userId: number, providerPlaceIds: string[]) {
    return this.placeRepository.find({
      where: {
        userId,
        providerId: In(providerPlaceIds)
      }
    });
  }

  async setPriceLevel(
    providerPlaceId: string,
    priceLevel: PriceLevel,
    userId: number
  ) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Error('No user found');
    }

    const place = await this.findByIdOrCreate(providerPlaceId, user);
    await this.placeRepository.update(place.id, { priceLevel });

    logger.info('Price level updated', { place: place.id, priceLevel });

    return priceLevel;
  }

  async addTag(providerPlaceId: string, name: string, userId: number) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Error('No user found');
    }

    const place = await this.findByIdOrCreate(providerPlaceId, user);
    const tag = await this.tagService.findByNameOrCreate(name, place, user);

    place.tags = place.tags ? place.tags.concat(tag) : [tag];

    await this.placeRepository.save(place);

    logger.info('Tag added', { place: place.id, tag: tag.id });

    return tag;
  }

  async removeTag(providerPlaceId: string, tagId: number, userId: number) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Error('No user found');
    }

    const place = await this.findByIdOrCreate(providerPlaceId, user);
    place.tags = place.tags.filter(tag => tag.id !== tagId);

    await this.placeRepository.save(place);

    logger.info('Tag removed', { place: place.id, tag: tagId });

    return tagId;
  }

  async setComment(providerPlaceId: string, comment: string, userId: number) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Error('No user found');
    }

    const place = await this.findByIdOrCreate(providerPlaceId, user);
    place.comment = comment;

    await this.placeRepository.save(place);

    logger.info('Comment set', { place: place.id });

    return comment;
  }

  async getWantToVisitList(userId: number) {
    const wantToVisit = await this.wtvRepository.find({ where: { userId } });

    const places = Promise.all(
      wantToVisit.map(
        async wtv => await this.getPlaceDetails(wtv.placeProviderId)
      )
    );

    return places;
  }

  async searchPlaces(userId: number, query: string, location?: Coordinates) {
    const results = await this.hereService.search(query, location);

    const providerIds = results.map(result => result.id);

    const userPlaces =
      providerIds.length > 0
        ? await this.getUserPlacesByProviderIds(userId, providerIds)
        : [];

    const transformWithUserPlaces = transformProviderSearchItem(userPlaces);
    return results.map(transformWithUserPlaces);
  }

  async removeType(
    providerId: string,
    type: PlaceType,
    userId: number
  ): Promise<PlaceType[]> {
    const place = await this.findByProviderId(providerId, userId);

    if (!place) {
      throw new Error('No place found');
    }

    const foundType = Object.entries(PlaceType).find(([key]) => key === type);

    if (!foundType) {
      logger.error(`No place type found matching "${type}"`, { type });
      throw new Error(`No place type found matching "${type}"`);
    }

    const [, value] = foundType;

    const updatedTypes = (place.types || []).filter(t => t !== value);

    await this.placeRepository.update(place.id, {
      types: updatedTypes
    });

    logger.info('Type removed', { place: place.id, user: userId, type });

    return updatedTypes;
  }

  async addType(
    providerId: string,
    type: PlaceType,
    userId: number
  ): Promise<PlaceType[]> {
    const place = await this.findByProviderId(providerId, userId);

    if (!place) {
      logger.error('No place found', { providerId, user: userId });
      throw new Error(`No place found for provider id "${providerId}"`);
    }

    const foundType = Object.entries(PlaceType).find(([key]) => key === type);

    if (!foundType) {
      logger.error(`No place type found matching "${type}"`, { type });
      throw new Error(`No place type found matching "${type}"`);
    }

    const [, value] = foundType;

    const updatedTypes = (place.types || []).concat(value);

    await this.placeRepository.update(place.id, {
      types: updatedTypes
    });

    logger.info('Type added', { place: place.id, user: userId, type });

    return updatedTypes;
  }
}
