import { Repository } from 'typeorm';
import { Place } from './place.entity';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Visit } from '../visit/visit.entity';
import { round } from '../../utils';

@Service()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    @InjectRepository(Visit)
    private readonly visitRepository: Repository<Visit>
  ) {}

  async getAverageScore(id: number): Promise<number> {
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

  async getVisitCount(id: number): Promise<number> {
    const visitCount = await this.visitRepository.count({
      where: { placeId: id }
    });

    return visitCount;
  }

  async getVisits(id: number, { limit }: { limit?: number }): Promise<Visit[]> {
    const visits = await this.visitRepository.find({
      where: { placeId: id },
      take: limit
    });

    return visits;
  }

  async findByIdOrSlug(id?: number, slug?: string): Promise<Place | null> {
    if (!id && !slug) {
      throw new Error('At least one argument is required');
    }

    const place = await this.placeRepository.findOne({
      where: [{ id }, { slug }]
    });

    if (!place) {
      return null;
    }

    return place;
  }
}
