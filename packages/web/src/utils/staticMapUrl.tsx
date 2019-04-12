import qs from 'query-string';

interface Marker {
  lat: number;
  lng: number;
  size: 'tiny' | 'mid' | 'small';
  color: string;
}

interface staticMapUrlParameters {
  geometry?: google.maps.places.PlaceGeometry;
  size: string;
  zoom: number;
  marker?: Marker;
}

const base = 'https://maps.googleapis.com/maps/api/staticmap';

export const staticMapUrl = ({
  geometry,
  size,
  zoom = 13
}: staticMapUrlParameters): string => {
  if (geometry === undefined) {
    return '';
  }

  const { lat, lng } = geometry.location;

  const queryString = qs.stringify({
    center: `${lat()},${lng()}`,
    size,
    zoom,
    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  return `${base}?${queryString}`;
};
