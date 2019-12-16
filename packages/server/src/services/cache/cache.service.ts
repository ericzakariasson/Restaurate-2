import { logger } from '../../utils/logger';
import { redis, RedisClient } from '../redis/redis';

interface CacheServiceOptions {
  ttl?: number;
}

const defaultOptions: CacheServiceOptions = {
  ttl: 24 * 60 * 60 // 24 hours
};

export class CacheService {
  private client: RedisClient;
  constructor() {
    this.client = redis;

    this.client.on('connect', this.onConnect);
    this.client.on('error', this.onError);
  }

  private onConnect() {
    logger.debug('Cache service: Redis client connected');
  }

  private onError(error: any) {
    logger.error('Cache service: Redis error', error);
  }

  public async getJSON<T>(key: string): Promise<T | null> {
    try {
      const value = await new Promise<string | null>(resolve => {
        this.client.get(key, (error: any, result: string | null) => {
          if (error) {
            logger.error('Cache get error', error);
            throw new Error(error);
          }

          resolve(result);
        });
      });

      if (value === null) {
        return value;
      }

      const parsed: T = JSON.parse(value);
      return parsed;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public async get(key: string): Promise<string | null> {
    try {
      const value = await new Promise<string | null>(resolve => {
        this.client.get(key, (error: any, result: string | null) => {
          if (error) {
            logger.error('Cache get error', error);
            throw new Error(error);
          }

          resolve(result);
        });
      });

      return value;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public set(
    key: string,
    value: any,
    expires = defaultOptions.ttl
  ): Promise<string> {
    return this.client.set(key, value, 'EX', expires);
  }

  public setJSON<T>(
    key: string,
    value: T,
    expires = defaultOptions.ttl
  ): Promise<string> {
    const json = JSON.stringify(value);
    return this.client.set(key, json, 'EX', expires);
  }
}
