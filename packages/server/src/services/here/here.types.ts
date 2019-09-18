import { Field, ObjectType, ID } from 'type-graphql';
import { ExecSyncOptionsWithBufferEncoding } from 'child_process';
import { isOptionalCallExpression } from '@babel/types';

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

export class SearchResultItem {
  @Field(() => ID)
  id: string;

  @Field(() => Coordinates)
  position: Coordinates;

  @Field()
  ditance: number;

  @Field()
  title: string;

  @Field()
  averageRating: number;

  @Field()
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

export interface SearchResult {
  results: {
    items: SearchResultItem[];
  };
}
