import { v2 as cloudinary } from 'cloudinary';
import {
  Arg,
  Authorized,
  Field,
  Mutation,
  ObjectType,
  Resolver,
  InputType
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

@InputType()
class SignImagesInput {
  @Field(() => [SignImageInput])
  images: SignImageInput[];
}

@Service()
@Resolver()
export class UtilsResolver {
  constructor() {}

  @Authorized()
  @Mutation(() => [SignImageData])
  async signImagesData(
    @Arg('data')
    input: SignImagesInput
  ): Promise<SignImageData[]> {
    const signedImagesData = input.images.map(data => {
      const timestamp = Math.round(Date.now() / 1000);

      const apiUrl = cloudinary.utils.api_url('upload', {
        resource_type: 'auto'
      });

      const query = cloudinary.utils.sign_request({
        public_id: data.name,
        folder: data.placeProviderId,
        tags: data.tags.join(','),
        timestamp,
        format: 'jpg'
      });

      const payload = new SignImageData({
        apiUrl,
        query: JSON.stringify(query)
      });
      return payload;
    });

    return signedImagesData;
  }
}
