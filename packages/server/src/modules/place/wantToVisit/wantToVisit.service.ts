import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { WantToVisit } from './wantToVisit.entity';
import { UserService } from '../../user/user.service';

@Service()
export class WantToVisitService {
  constructor(
    @InjectRepository(WantToVisit)
    private readonly wtvRepository: Repository<WantToVisit>,
    private readonly userService: UserService
  ) {}

  async toggle(providerPlaceId: string, userId: number) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Error('No user found');
    }

    const exists = await this.findByProviderId(providerPlaceId, userId);

    if (exists) {
      await this.wtvRepository.remove(exists);
      return true;
    }

    const wantToVisit = this.wtvRepository.create({
      providerPlaceId,
      user,
      userId: user.id
    });

    await this.wtvRepository.save(wantToVisit);

    return true;
  }

  async findByProviderId(providerPlaceId: string, userId: number) {
    return this.wtvRepository.findOne({ where: { providerPlaceId, userId } });
  }
}
