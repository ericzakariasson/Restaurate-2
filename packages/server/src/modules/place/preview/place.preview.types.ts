import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export class PlacePreview {
  @Field(() => ID, { nullable: true })
  placeId: number | null;
}
