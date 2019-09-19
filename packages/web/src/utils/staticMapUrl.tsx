import qs from 'query-string';

interface Marker {
  lat: number;
  lng: number;
  size: 'tiny' | 'mid' | 'small';
  color: string;
}

interface StaticMapParameters {
  geometry?: google.maps.places.PlaceGeometry;
  zoom?: number;
}

interface staticGoogleMapUrlParameters extends StaticMapParameters {
  size: string;
}

const GOOGLE_STATIC_MAPS_BASE =
  'https://maps.googleapis.com/maps/api/staticmap';

export const staticGoogleMapUrl = ({
  geometry,
  size,
  zoom = 13
}: staticGoogleMapUrlParameters): string => {
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

  return `${GOOGLE_STATIC_MAPS_BASE}?${queryString}`;
};

interface MapboxOptions {
  logo?: boolean;
  pitch?: number;
}

interface staticMapboxMapUrlParameters extends StaticMapParameters {
  width: number;
  height: number;
  lat?: number;
  lng?: number;
  retina?: boolean;
  options?: MapboxOptions;
}

const MAPBOX_STATIC_MAPS_BASE =
  'https://api.mapbox.com/styles/v1/ericzakariasson/cjuign0eq0cui1fs4b9hble2c/static';

export const staticMapUrl = ({
  zoom = 12,
  lat,
  lng,
  geometry,
  width,
  height,
  retina = true,
  options
}: staticMapboxMapUrlParameters): string => {
  const latitude = geometry ? geometry!.location.lat() : lat;
  const longitude = geometry ? geometry!.location.lng() : lng;

  const optionsQuery = options ? qs.stringify(options) : '';

  return `${MAPBOX_STATIC_MAPS_BASE}/${longitude},${latitude},${zoom},0,0/${width.toFixed(
    0
  )}x${height.toFixed(0)}${retina ? '@2x' : ''}?access_token=${
    process.env.REACT_APP_MAPBOX_API_KEY
  }&${optionsQuery}`;
};
