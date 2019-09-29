import { Field, ID, ObjectType } from 'type-graphql';
import { PlaceDetails } from '../place.types';

@ObjectType()
export class PlacePreview {
  @Field(() => ID)
  id: string;

  @Field(() => PlaceDetails)
  details: PlaceDetails;

  @Field()
  wantToVisit: boolean;

  @Field(() => Number, { nullable: true })
  placeId: number | null;
}
