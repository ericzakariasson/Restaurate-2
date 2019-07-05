import nodeFetch from 'node-fetch';
import * as qs from 'qs';
import {
  Venue,
  VenueSearchResponse,
  SearchOptions,
  Config,
  DetailOptions,
  VenueDetailsResponse,
  VenueDetails
} from './types';

class FoursquareRepository {
  private baseUrl: string = 'https://api.foursquare.com/v2';

  private clientId: string;
  private clientSecret: string;

  constructor(config?: Config) {
    if (config) {
      this.clientId = config.clientId;
      this.clientSecret = config.clientSecret;
    } else {
      this.clientId = process.env.FOURSQUARE_CLIENT_ID as string;
      this.clientSecret = process.env.FOURSQUARE_CLIENT_SECRET as string;
    }
  }

  private getParameters(options: object) {
    const date = new Date();
    const version = date
      .toISOString()
      .slice(0, 10)
      .split('-')
      .join('');

    const parameters = qs.stringify({
      ...options,
      client_id: this.clientId,
      client_secret: this.clientSecret,
      v: version
    });

    return parameters;
  }

  async fetch<T>(url: string, options?: object) {
    const parameters = this.getParameters(options || {});

    const endpoint = `${this.baseUrl}/${url}?${parameters}`;

    const response = await nodeFetch(endpoint);

    const json = await response.json();
    return json as T;
  }
}

class VenueService {
  private repository: FoursquareRepository;

  constructor(repository: FoursquareRepository) {
    this.repository = repository;
  }

  async search(options: SearchOptions): Promise<Venue[]> {
    const { response } = await this.repository.fetch<VenueSearchResponse>(
      '/venues/search',
      options
    );

    return response.venues;
  }

  async details(id: string, options?: DetailOptions): Promise<VenueDetails> {
    const { response } = await this.repository.fetch<VenueDetailsResponse>(
      `/venues/${id}`,
      options
    );

    return response.venue;
  }
}

export class FoursquareService {
  venue: VenueService;

  constructor() {
    const repository = new FoursquareRepository();
    this.venue = new VenueService(repository);
  }
}
