import { ObjectType, Field, Int, InputType } from 'type-graphql';

export interface Pagination {
  page: number;
  limit: number;
}

@InputType('PaginationInput')
@ObjectType()
export class PaginationOptions implements Pagination {
  @Field(() => Int, { defaultValue: 0 })
  page: number;

  @Field(() => Int)
  limit: number = 24;
}
