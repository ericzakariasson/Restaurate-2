import { Venue, Category, VenueDetails } from '../../services/foursquare/types';
import { PlaceSearchItem, Position } from './place.types';
import * as categories from '../../translations/categories.json';
import { Place } from './place.entity';

export const transformVenueToSearchItem = (userPlaces: Place[]) => (
  venue: Venue | VenueDetails
) => {
  const samePlace = userPlaces.find(place => place.foursquareId === venue.id);
  const formattedAddress =
    venue.location.address && venue.location.city
      ? `${venue.location.address}, ${venue.location.city}`
      : venue.location.country;

  const place = new PlaceSearchItem();
  place.foursquareId = venue.id;
  place.name = venue.name;
  place.address = formattedAddress;
  place.coordinates = new Position({
    lat: venue.location.lat,
    lng: venue.location.lng
  });
  place.types = venue.categories.map(translateCategory);
  place.visits = samePlace ? samePlace.visits.length : 0;

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
