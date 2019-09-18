import { InputType, Field, ObjectType } from 'type-graphql';
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

@ObjectType()
@InputType()
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
