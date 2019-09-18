import nodeFetch from 'node-fetch';
import * as qs from 'qs';
import {
  Coordinates,
  HereSearchResultItem,
  HereSearchResult
} from './here.types';

type Headers = { [key: string]: string };

const getGeolocationHeader = ({ lat, lng }: Coordinates) => `geo:${lat},${lng}`;

const FALLBACK_COORDINATES: Coordinates = {
  lat: 57.7087,
  lng: 11.9751
};

class HereRepository {
  private baseUrl: string = 'https://places.api.here.com/places/v1';

  private appId: string;
  private appCode: string;

  constructor() {
    this.appId = process.env.HERE_APP_ID as string;
    this.appCode = process.env.HERE_APP_CODE as string;
  }

  private getParameters(options: object) {
    const parameters = qs.stringify(
      {
        ...options,
        app_id: this.appId,
        app_code: this.appCode
      },
      { arrayFormat: 'comma' }
    );

    return parameters;
  }

  async fetch<T>(url: string, options?: object, headers?: Headers) {
    const parameters = this.getParameters(options || {});
    const endpoint = `${this.baseUrl}/${url}?${parameters}`;

    const response = await nodeFetch(endpoint, { headers });

    if (response.status !== 200) {
      console.error(response.statusText);
    }

    const json: T = await response.json();
    return json;
  }
}

export class HereService {
  private repository: HereRepository;

  constructor() {
    this.repository = new HereRepository();
  }

  public async search(
    query: string,
    location?: Coordinates
  ): Promise<HereSearchResultItem[]> {
    const geolocationHeader = getGeolocationHeader(
      location || FALLBACK_COORDINATES
    );

    const data = await this.repository.fetch<HereSearchResult>(
      '/discover/search',
      {
        q: query
      },
      {
        Geolocation: geolocationHeader
      }
    );

    return data.results.items;
  }
}
