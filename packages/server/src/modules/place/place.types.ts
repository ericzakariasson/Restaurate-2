import { InputType, Field, ObjectType } from 'type-graphql';

export enum PlaceType {
  Restaurant = 'RESTAURANT',
  Cafe = 'CAFE' // 4bf58dd8d48988d16d941735
}

export enum PriceLevel {
  NotSet = 0,
  Inexpensive = 1,
  Moderate = 2,
  Expensive = 3,
  Exclusive = 4
}

@InputType()
export class PlaceInput {
  @Field({ nullable: true })
  id?: number;

  @Field()
  providerPlaceId: string;

  @Field(() => PriceLevel, { nullable: true })
  priceLevel?: PriceLevel;

  @Field(() => [PlaceType])
  types: PlaceType[];

  @Field(() => [String])
  tags: string[];
}

export interface Coordinates {
  lat: number;
  lng: number;
}

@ObjectType()
export class Position implements Coordinates {
  constructor(data?: Coordinates) {
    if (data) {
      this.lat = data.lat;
      this.lng = data.lng;
    }
  }

  @Field()
  lat: number;

  @Field()
  lng: number;
}

@InputType()
export class PositionInput implements Coordinates {
  @Field()
  lat: number;

  @Field()
  lng: number;
}

@InputType()
export class PlaceSearchInput {
  @Field()
  query: string;

  @Field({ nullable: true })
  near?: string;

  @Field(() => PositionInput, { nullable: true })
  position?: PositionInput;
}

@ObjectType()
export class PlaceSearchItem {
  @Field()
  providerId: string;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  visits: number;

  @Field(() => Position)
  coordinates: Position;

  @Field(() => [String])
  categories: string[];
}

@ObjectType()
export class PlaceSearchResult {
  constructor({ places }: { places: PlaceSearchItem[] }) {
    this.places = places;
  }

  @Field(() => [PlaceSearchItem])
  places: PlaceSearchItem[];
}
