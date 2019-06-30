import { placeTypeMap } from './PlaceType';
import { Address } from '../Address/Address';
import { AddVisitInput } from '../Visit/AddVisitInput';
import { Place } from './Place';
import { priceLevelMap } from './PriceLevel';
import { GoogleMapsClient } from '@google/maps';

export async function createPlace(
  input: AddVisitInput,
  client: GoogleMapsClient
): Promise<Place> {
  const placeData = (await client
    .place({ placeid: input.providerPlaceId })
    .asPromise()).json.result;

  const address = Address.createFromPlaceData(placeData);

  const types = input.types
    .filter(type => type in placeTypeMap)
    .map(type => placeTypeMap[type]);

  const place = await Place.create({
    googlePlaceId: placeData.place_id,
    address,
    types,
    name: placeData.name,
    lat: placeData.geometry.location.lat,
    lng: placeData.geometry.location.lng,
    url: placeData.website,
    priceLevel: input.priceLevel
      ? priceLevelMap[input.priceLevel]
      : priceLevelMap[placeData.price_level]
  });

  place.slugify();

  return place;
}
