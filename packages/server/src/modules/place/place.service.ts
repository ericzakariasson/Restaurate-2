import { Repository } from 'typeorm';
import { Place } from './place.entity';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Visit } from '../visit/visit.entity';
import { round, slugify } from '../../utils';
import { FoursquareService } from '../../services/foursquare/foursquare.service';
import { User } from '../user/user.entity';
import { TagService } from './tag/tag.service';
import { PlaceInput } from './place.types';

@Service()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    @InjectRepository(Visit)
    private readonly visitRepository: Repository<Visit>,
    private readonly foursquareService: FoursquareService,
    private readonly tagService: TagService
  ) {}

  async getAverageScore(id: number) {
    const visits = await this.visitRepository.find({
      where: { placeId: id }
    });

    if (!visits.length) {
      return 0;
    }

    const averageScore =
      visits.reduce((score, visit) => score + visit.rate.score, 0) /
      visits.length;

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
      take: limit
    });

    return visits;
  }

  async findByIdOrSlug(id?: number, slug?: string) {
    const place = await this.placeRepository.findOne({
      where: [{ id }, { slug }]
    });

    if (!place) {
      return null;
    }

    return place;
  }

  async getPlaceData(providerId: string) {
    return this.foursquareService.venue.details(providerId);
  }

  async findByInputOrCreate({ id, ...input }: PlaceInput, user: User) {
    const place = await this.placeRepository.findOne(id);

    if (place) {
      return place;
    }

    return this.createPlace(input, user);
  }

  async createPlace(input: PlaceInput, user: User) {
    const tags = input.tags
      ? await Promise.all(
          input.tags.map(
            async name => await this.tagService.findByNameOrCreate(name, user)
          )
        )
      : [];

    const { name, location } = await this.getPlaceData(input.foursquareId);

    const createdPlace = this.placeRepository.create({
      ...input,
      user,
      tags,
      slug: slugify(`${name} ${location.address} ${location.city}`)
    });

    await this.placeRepository.save(createdPlace);

    return createdPlace;
  }

  async findById(id: number) {
    const place = await this.placeRepository.findOne(id);
    return place;
  }
}
