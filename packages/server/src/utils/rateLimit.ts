import { MiddlewareFn } from 'type-graphql';
import { redis } from '../services/redis/redis';
import { Context } from '../graphql/types';

const ONE_DAY = 60 * 60 * 24;

export const rateLimitAuthenticated: (
  limit?: number
) => MiddlewareFn<Context> = (limit = 50) => async (
  { context: { req }, info },
  next
) => {
  const key = `rate-limit:${info.fieldName}:${req.session.userId!}`;

  const current = await redis.incr(key);
  if (current > limit) {
    throw new Error("You're doing that too much");
  } else if (current === 1) {
    await redis.expire(key, ONE_DAY);
  }

  return next();
};

export const rateLimit: (limit?: number) => MiddlewareFn<Context> = (
  limit = 50
) => async ({ context: { req }, info }, next) => {
  const key = `rate-limit:${info.fieldName}:${req.ip}`;

  const current = await redis.incr(key);
  if (current > limit) {
    throw new Error("You're doing that too much");
  } else if (current === 1) {
    await redis.expire(key, ONE_DAY);
  }

  return next();
};
