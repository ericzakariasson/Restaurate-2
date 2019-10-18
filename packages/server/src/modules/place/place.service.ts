import { Service } from 'typedi';
import { In, Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CacheService } from '../../services/cache/cache.service';
import { HereService } from '../../services/here/here.service';
import { round } from '../../utils';
import { logger } from '../../utils/logger';
import { Coordinates } from '../../utils/utils.types';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Visit } from '../visit/visit.entity';
import { Place } from './place.entity';
import {
  transformProviderDetails,
  transformProviderSearchItem
} from './place.helpers';
import { PlaceDetails, UpdatePlaceInput } from './place.types';
import { TagService } from './tag/tag.service';
import { WantToVisitService } from './wantToVisit/wantToVisit.service';

const placeDetailsKey = (key: string) => `placeDetails:providerId:${key}`;

@Service()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    @InjectRepository(Visit)
    private readonly visitRepository: Repository<Visit>,
    private readonly wtvService: WantToVisitService,
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
    await this.wtvService.remove(providerPlaceId, user);

    const createdPlace = this.placeRepository.create({
      user,
      userId: user.id,
      providerId: providerPlaceId,
      tags: []
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
      },
      relations: ['visits']
    });
  }

  async getWantToVisitList(userId: number) {
    const wantToVisit = await this.wtvService.getAllByUser(userId);

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

  async setTags(place: Place, tagNames: string[], user: User) {
    place.tags = place.tags.filter(tag => tagNames.includes(tag.name));

    const newTagNames = tagNames.filter(
      tagName => !place.tags.some(tag => tag.name === tagName)
    );

    const newTags = await Promise.all(
      newTagNames.map(
        async tagName =>
          await this.tagService.findByNameOrCreate(tagName, place, user)
      )
    );

    newTags.forEach(t => place.tags.push(t));

    logger.info('Updated place tags', {
      place: place.id,
      tags: place.tags.map(tag => tag.id)
    });

    return place;
  }

  async update(providerId: string, input: UpdatePlaceInput, userId: number) {
    const user = await this.userService.findById(userId);

    if (!user) {
      logger.error('No user found', { providerId, user: userId });
      throw new Error(`No user found with id "${providerId}"`);
    }

    const place = await this.findByIdOrCreate(providerId, user);

    if (!place) {
      logger.error('No place found', { providerId, user: userId });
      throw new Error(`No place found with provider id "${providerId}"`);
    }

    if (input.comment) {
      place.comment = input.comment;
      logger.info('Place comment updated', { place: place.id, user: userId });
    }

    if (input.priceLevel !== undefined) {
      place.priceLevel = input.priceLevel;
      logger.info('Place price level updated', {
        place: place.id,
        user: userId,
        priceLevel: place.priceLevel
      });
    }

    if (input.types) {
      place.types = input.types;
      logger.info('Types added', { place: place.id, types: input.types });
    }

    if (input.tags) {
      await this.setTags(place, input.tags, user);
    }

    await this.placeRepository.save(place);

    return place;
  }
}
