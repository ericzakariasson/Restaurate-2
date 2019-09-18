import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
class Category {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  href: string;

  @Field()
  type: string;

  @Field()
  system: string;
}

@ObjectType()
class OpeningHours {
  @Field()
  label: string;

  @Field()
  isOpen: boolean;

  @Field()
  text: string;
}

@ObjectType()
export class Coordinates {
  @Field()
  lat: number;

  @Field()
  lng: number;
}

@ObjectType()
export class HereSearchResultItem {
  @Field(() => ID)
  id: string;

  @Field(() => [Number])
  position: number[];

  @Field()
  ditance: number;

  @Field()
  title: string;

  @Field()
  averageRating: number;

  @Field(() => [Category])
  categories: Category[];

  @Field()
  icon: string;

  @Field()
  vicinity: string;

  @Field()
  href: string;

  @Field(() => OpeningHours)
  openingHours: OpeningHours;
}

export interface HereSearchResult {
  results: {
    items: HereSearchResultItem[];
  };
}
