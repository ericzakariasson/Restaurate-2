import { v2 as cloudinary } from 'cloudinary';
import { format } from 'date-fns';
import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { SignImageData, SignImagesInput } from './image.types';

@Service()
@Resolver()
export class ImageResolver {
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
        public_id: `${data.type}-${format(new Date(), 'yyyyMMdd')}`,
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
