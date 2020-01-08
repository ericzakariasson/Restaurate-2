import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Tag } from './tag.entity';
import { User } from '../../user/user.entity';
import { Place } from '../place.entity';

@Service()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
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

  async getTagsByPlaceId(_placeId: number): Promise<Tag[]> {
    return this.tagRepository
      .createQueryBuilder('tag')
      .innerJoin('tag.place', 'place', 'place.id = :placeId', {
        placeId: 1
      })
      .select('tag.*')
      .getRawMany();
  }

  async getAllTags(userId: number) {
    return await this.tagRepository.find({
      where: { userId },
      relations: ['place']
    });
  }
}
