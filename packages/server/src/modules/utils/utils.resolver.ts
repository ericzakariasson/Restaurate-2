import { v2 as cloudinary } from 'cloudinary';

import {
  Arg,
  Authorized,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Resolver
} from 'type-graphql';
import { Service } from 'typedi';

@ObjectType()
class SignImageData {
  constructor({ apiUrl, query }: SignImageData) {
    this.apiUrl = apiUrl;
    this.query = query;
  }

  @Field()
  apiUrl: string;

  @Field()
  query: string;
}

@InputType()
class SignImageInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  placeProviderId: string;

  @Field(() => [String])
  tags: string[];
}

@Service()
@Resolver()
export class UtilsResolver {
  constructor() {}

  @Authorized()
  @Mutation(() => SignImageData)
  async signImageData(
    @Arg('data')
    input: SignImageInput
  ): Promise<SignImageData> {
    const timestamp = Math.round(Date.now() / 1000);

    const apiUrl = cloudinary.utils.api_url('upload', {
      resource_type: 'auto'
    });

    const query = cloudinary.utils.sign_request({
      public_id: input.name,
      folder: input.placeProviderId,
      tags: input.tags.join(','),
      timestamp,
      format: 'jpg'
    });

    const payload = new SignImageData({ apiUrl, query: JSON.stringify(query) });

    return payload;
  }
}
