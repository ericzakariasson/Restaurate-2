import * as cloudinary from 'cloudinary';
import { format } from 'date-fns';
import { Arg, Authorized, Mutation, Resolver, Ctx } from 'type-graphql';
import { Service } from 'typedi';
import { SignImageData, SignImagesInput } from './image.types';
import { PlaceService } from '../place/place.service';
import { slugify } from '../../utils';
import { Context } from '../../graphql/types';
import * as shortid from 'shortid';

@Service()
@Resolver()
export class ImageResolver {
  constructor(private placeService: PlaceService) {}

  @Authorized()
  @Mutation(() => [SignImageData])
  async signImagesData(
    @Ctx() ctx: Context,
    @Arg('data')
    input: SignImagesInput
  ): Promise<SignImageData[]> {
    const signedImagesData = input.images.map(async data => {
      const placeDetails = await this.placeService.getPlaceDetails(
        data.placeProviderId
      );

      const timestamp = Math.round(Date.now() / 1000);

      const apiUrl: string = await cloudinary.v2.utils.api_url('upload', {
        resource_type: 'auto'
      });

      const id = shortid.generate();

      const publicId = `${format(new Date(), 'yyyyMMdd')}-${slugify(
        placeDetails.name
      )}-${slugify(placeDetails.location.address.city)}-${data.type}-${id}`;

      const query = cloudinary.v2.utils.sign_request({
        public_id: publicId,
        tags: data.tags.join(','),
        timestamp,
        folder: data.type,
        context: `type=${data.type}|place_provider_id=${data.placeProviderId}|user_id=${ctx.req.session.userId}`,
        format: 'jpg'
      });

      const payload = new SignImageData({
        apiUrl,
        query: JSON.stringify(query)
      });

      return payload;
    });

    return Promise.all(signedImagesData);
  }
}
