import { InputType, Field, ObjectType, InterfaceType } from 'type-graphql';
import { Coordinates } from '../../utils/utils.types';

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

  @Field()
  house: string;

  @Field()
  street: string;

  @Field()
  postalCode: string;

  @Field()
  district: string;

  @Field()
  city: string;

  @Field()
  county: string;

  @Field()
  state: string;

  @Field()
  country: string;

  @Field()
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
  @Field(() => [KeyValuePair])
  phone: KeyValuePair[];

  @Field(() => [KeyValuePair])
  website: KeyValuePair[];
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

  @Field(() => OpeningHours)
  openingHours: OpeningHours;
}
