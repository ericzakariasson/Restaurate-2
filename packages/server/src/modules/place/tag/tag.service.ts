import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Tag } from './tag.entity';
import { User } from '../../user/user.entity';

@Service()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) {}

  async findByNameOrCreate(name: string, user: User) {
    const tag = await this.tagRepository.findOne({ where: { name } });

    if (tag) {
      return tag;
    }

    const newTag = this.tagRepository.create({ name, user });
    return await this.tagRepository.save(newTag);
  }
}
