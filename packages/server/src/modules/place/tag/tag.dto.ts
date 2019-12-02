import { Tag } from './tag.entity';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class FilterTag implements Partial<Tag> {
  constructor(initializer?: Partial<FilterTag>) {
    Object.assign(this, initializer);
  }

  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  placeCount: number;

  static fromEntity(tag: Tag) {
    return new FilterTag({
      id: tag.id,
      name: tag.name,
      placeCount: tag.place.length
    });
  }
}
