import { registerEnumType } from 'type-graphql';

export enum PlaceType {
  Restaurant = 'RESTAURANT',
  Cafe = 'CAFE'
}

registerEnumType(PlaceType, {
  name: 'PlaceType',
  description: 'Type of place'
});

type PlaceTypeMap = { [key: string]: PlaceType };

export const placeTypeMap: PlaceTypeMap = {
  restaurant: PlaceType.Restaurant,
  cafe: PlaceType.Cafe
};
