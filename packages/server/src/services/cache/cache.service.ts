import * as NodeCache from 'node-cache';

interface CacheServiceOptions {
  ttl?: number;
}

const defaultOptions: CacheServiceOptions = {
  ttl: 24 * 60 * 60 // 24 hours
};

export class CacheService {
  private cache: NodeCache;

  constructor({ ttl = defaultOptions.ttl }: CacheServiceOptions) {
    this.cache = new NodeCache({ stdTTL: ttl });
  }

  public get<T>(key: string) {
    return this.cache.get<T>(key);
  }

  public set<T>(key: string, value: T) {
    return this.cache.set(key, value);
  }
}
