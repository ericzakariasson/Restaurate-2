import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Rate } from './rate.entity';

@Service()
export class RateService {
  constructor(
    @InjectRepository(Rate)
    private readonly rateRepository: Repository<Rate>
  ) {}

  async getRateChildren(id: number) {
    return this.rateRepository.find({ where: { parentId: id } });
  }
}
