import { Venue, Category, VenueDetails } from '../../services/foursquare/types';
import { PlaceSearchItem, Position } from './place.types';
import * as categories from '../../translations/categories.json';
import { Place } from './place.entity';
import { HereSearchResultItem } from '../../services/here/here.types';

export const transformVenueToSearchItem = (userPlaces: Place[]) => (
  venue: Venue | VenueDetails
) => {
  const samePlace = userPlaces.find(
    place => place.providerPlaceId === venue.id
  );
  const formattedAddress =
    venue.location.address && venue.location.city
      ? `${venue.location.address}, ${venue.location.city}`
      : venue.location.country;

  const place = new PlaceSearchItem();
  place.providerId = venue.id;
  place.name = venue.name;
  place.address = formattedAddress;
  place.coordinates = new Position({
    lat: venue.location.lat,
    lng: venue.location.lng
  });
  place.categories = venue.categories.map(translateCategory);
  place.visits = samePlace && samePlace.visits ? samePlace.visits.length : 0;

  return place;
};

export const transformVenueDetailsToBasicDetails = (
  userPlace: Place | null,
  venue: VenueDetails
) => transformVenueToSearchItem(userPlace ? [userPlace] : [])(venue);
interface Categories {
  [key: string]: {
    sv: string;
    en: string;
    default: string;
  };
}

function translateCategory(category: Category) {
  const categoryById = (categories as Categories)[category.id];

  if (categoryById) {
    return categoryById.sv || categoryById.default;
  }

  return category.name;
}

function formatProviderSearchItemAddress(vicinity: string) {
  const result = /(.*)\<br\/\>\w{2}-\d{3}\s{1}\d{2}\s{1}(.*)/.exec(vicinity);
  if (result) {
    const [, street, city] = result;
    return `${street}, ${city}`;
  }

  return '';
}

export const transformProviderSearchItem = (userPlaces: Place[]) => (
  item: HereSearchResultItem
) => {
  const samePlace = userPlaces.find(place => place.providerPlaceId === item.id);

  const [lat, lng] = item.position;
  const place = new PlaceSearchItem();
  place.providerId = item.id;
  place.name = item.title;
  place.coordinates = { lat, lng };
  place.address = formatProviderSearchItemAddress(item.vicinity);
  place.visits = 0;
  place.categories = item.categories
    ? item.categories.map(category => category.title)
    : [];

  place.visits = samePlace
    ? samePlace.visits
      ? samePlace.visits.length
      : 0
    : 0;

  return place;
};
