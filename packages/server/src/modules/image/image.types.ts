import { Field, InputType, ObjectType, registerEnumType } from 'type-graphql';

@ObjectType()
export class SignImageData {
  constructor(initializer: SignImageData) {
    Object.assign(this, initializer);
  }

  @Field()
  apiUrl: string;

  @Field()
  query: string;
}

@InputType()
export class SignImageInput {
  @Field(() => ImageType)
  type: ImageType;

  @Field(() => String)
  placeProviderId: string;

  @Field(() => [String])
  tags: string[];
}

@InputType()
export class SignImagesInput {
  @Field(() => [SignImageInput])
  images: SignImageInput[];
}

export enum ImageType {
  Visit = 'VISIT',
  Place = 'PLACE'
}

registerEnumType(ImageType, {
  name: 'ImageType',
  description: 'Type of image'
});
