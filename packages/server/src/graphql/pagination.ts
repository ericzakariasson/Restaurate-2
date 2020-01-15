import { ObjectType, Field, Int, InputType, ClassType } from 'type-graphql';

export interface Pagination {
  page: number;
  limit: number;
  hasNextPage: boolean;
}

@InputType()
export class PageOptions implements Partial<Pagination> {
  @Field(() => Int, { defaultValue: 0 })
  page: number;

  @Field(() => Int, { defaultValue: 24 })
  limit: number;
}

@ObjectType()
export class PageInfo implements Pagination {
  constructor(initializer: Pagination) {
    Object.assign(this, initializer);
  }

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field()
  hasNextPage: boolean;
}

export default function PaginatedResponse<TItem>(
  getNodesType: () => [ClassType<TItem>]
) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    constructor(data: TItem[], pageInfo: Pagination) {
      this.data = data;
      this.pageInfo = new PageInfo(pageInfo);
    }

    @Field(getNodesType)
    data: TItem[];

    @Field(() => PageInfo)
    pageInfo: PageInfo;
  }
  return PaginatedResponseClass;
}
