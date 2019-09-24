import nodeFetch from 'node-fetch';
import * as qs from 'qs';
import {
  HereSearchResultItem,
  HereSearchResult,
  HerePlaceDetails,
  Headers
} from './here.types';
import { Coordinates } from '../../utils/utils.types';
import { logger } from '../../utils/logger';

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

    if (!process.env.HERE_APP_ID || !process.env.HERE_APP_ID) {
      throw new Error('No credentials for HERE provided');
    }

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

  private getHeaders(customHeaders: Headers) {
    const headers = {
      'Accept-Language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
      ...customHeaders
    };

    return headers;
  }

  async fetch<T>(url: string, options?: object, customHeaders?: Headers) {
    const parameters = this.getParameters(options || {});
    const headers = this.getHeaders(customHeaders || {});
    const endpoint = `${this.baseUrl}/${url}?${parameters}`;

    const response = await nodeFetch(endpoint, { headers });

    if (response.status !== 200) {
      logger.error('HERE response error', response.statusText);
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

    return data.results ? data.results.items : [];
  }

  public async details(id: string): Promise<HerePlaceDetails> {
    return this.repository.fetch<HerePlaceDetails>('places/lookup', {
      source: 'sharing',
      id
    });
  }
}
