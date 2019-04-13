import qs from 'query-string';

interface Marker {
  lat: number;
  lng: number;
  size: 'tiny' | 'mid' | 'small';
  color: string;
}

interface StaticMapParameters {
  geometry?: google.maps.places.PlaceGeometry;
  zoom: number;
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
  options?: MapboxOptions;
}

const MAPBOX_STATIC_MAPS_BASE =
  'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static';

export const staticMapboxMapUrl = ({
  geometry,
  zoom,
  width,
  height,
  options
}: staticMapboxMapUrlParameters): string => {
  if (geometry === undefined) {
    console.warn('No geometry found');
    return '';
  }

  const { lat, lng } = geometry.location;
  const optionsQuery = options ? qs.stringify(options) : '';

  return `${MAPBOX_STATIC_MAPS_BASE}/${lng()},${lat()},${zoom},0,0/${width}x${height}?access_token=${
    process.env.REACT_APP_MAPBOX_API_KEY
  }&${optionsQuery}`;
};
