import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class VenueDetails {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Contact)
  contact: Contact;

  @Field(() => Location)
  location: Location;

  @Field()
  url: string;

  @Field()
  description: string;
}

@ObjectType()
class Location {
  @Field()
  address: string;
  @Field()
  crossStreet: string;
  @Field()
  lat: number;
  @Field()
  lng: number;
  @Field()
  distance: number;
  @Field()
  postalCode: string;
  @Field()
  cc: string;
  @Field()
  city: string;
  @Field()
  state: string;
  @Field()
  country: string;
  @Field(() => [String])
  formattedAddress: string[];
}

@ObjectType()
class Contact {
  @Field()
  phone: string;
  @Field()
  formattedPhone: string;
  @Field()
  twitter: string;
  @Field()
  instagram: string;
  @Field()
  facebook: string;
  @Field()
  facebookUsername: string;
  @Field()
  facebookName: string;
}
