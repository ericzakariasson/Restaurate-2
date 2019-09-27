import { InputType, Field, ObjectType, InterfaceType } from 'type-graphql';
import { Coordinates } from '../../utils/utils.types';

export enum PlaceType {
  Restaurant = 'RESTAURANT',
  Cafe = 'CAFE',
  PubBar = 'PUB_BAR',
  FoodTruck = 'FOOD_TRUCK'
}

export enum PriceLevel {
  NotSet = 0,
  Inexpensive = 1,
  Moderate = 2,
  Expensive = 3,
  Exclusive = 4
}

@InterfaceType()
abstract class IPosition implements Coordinates {
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

@ObjectType({ implements: IPosition })
export class Position implements IPosition {
  lat: number;
  lng: number;
}

@InputType()
export class PositionInput implements IPosition {
  @Field()
  lat: number;

  @Field()
  lng: number;
}

@ObjectType()
export class PlaceDetailsBasic {
  @Field()
  providerId: string;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  visits: number;

  @Field(() => Position)
  position: Position;

  @Field(() => [String])
  categories: string[];
}

@ObjectType()
export class PlaceSearchResult {
  constructor({ places }: { places: PlaceDetailsBasic[] }) {
    this.places = places;
  }

  @Field(() => [PlaceDetailsBasic])
  places: PlaceDetailsBasic[];
}

@ObjectType()
export class Address {
  @Field()
  formatted: string;

  @Field({ nullable: true })
  house: string;

  @Field({ nullable: true })
  street: string;

  @Field({ nullable: true })
  postalCode: string;

  @Field({ nullable: true })
  district: string;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  county: string;

  @Field({ nullable: true })
  state: string;

  @Field({ nullable: true })
  country: string;

  @Field({ nullable: true })
  countryCode: string;
}

@ObjectType()
export class Location {
  @Field(() => Position)
  position: Position;

  @Field(() => Address)
  address: Address;
}

@ObjectType()
export class KeyValuePair {
  @Field()
  label: string;

  @Field()
  value: string;
}

@ObjectType()
export class Contact {
  @Field(() => [KeyValuePair], { nullable: true })
  phone?: KeyValuePair[];

  @Field(() => [KeyValuePair], { nullable: true })
  website?: KeyValuePair[];
}

@ObjectType()
export class OpeningHours {
  @Field()
  isOpen: boolean;
}

@ObjectType()
export class Category {
  @Field()
  id: string;

  @Field()
  title: string;
}

@ObjectType()
export class PlaceDetails {
  @Field()
  providerId: string;

  @Field()
  name: string;

  @Field(() => Location)
  location: Location;

  @Field(() => [Category])
  categories: Category[];

  @Field(() => Contact)
  contact: Contact;

  @Field(() => OpeningHours, { nullable: true })
  openingHours?: OpeningHours;
}
