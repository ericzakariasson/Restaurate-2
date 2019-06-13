import * as googleMaps from '@google/maps';

export function initGoogleClient() {
  const client = googleMaps.createClient({
    key: process.env.GOOGLE_MAPS_API_KEY as string,
    Promise: Promise
  });

  return client;
}
