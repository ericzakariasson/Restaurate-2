import { FilterTag } from './tag/tag.dto';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class DateRange {
  constructor(initializer?: DateRange) {
    Object.assign(this, initializer);
  }

  @Field(() => Date)
  from: Date;

  @Field(() => Date)
  to: Date;
}

@ObjectType()
export class PlaceFilterOptions {
  @Field(() => [FilterTag])
  tags: FilterTag[];

  @Field(() => DateRange)
  dateRange: DateRange;
}
