import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Tag } from './tag.entity';
import { User } from '../../user/user.entity';
import { Place } from '../place.entity';
import { TagRepository } from './tag.repository';

@Service()
export class TagService {
  constructor(
    @InjectRepository(TagRepository)
    private readonly tagRepository: TagRepository
  ) {}

  async findByNameOrCreate(name: string, place: Place, user: User) {
    const tag = await this.tagRepository.findOne({ where: { name } });

    if (tag) {
      return tag;
    }

    const newTag = this.tagRepository.create({
      name,
      user,
      userId: user.id,
      place: [place]
    });

    return this.tagRepository.save(newTag);
  }

  async getTagsByPlaceId(placeId: number): Promise<Tag[]> {
    return this.tagRepository.findByPlaceId(placeId);
  }

  async getTagsByUserId(userId: number) {
    return this.tagRepository.findByUserId(userId);
  }
}
