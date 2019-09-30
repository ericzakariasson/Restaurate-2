import { MiddlewareFn } from 'type-graphql';
import { redis } from '../../services/redis/redis';
import { Context } from '../../graphql/types';
import { days } from '../../utils/constants';
import { isProduction } from '../../utils/env.helper';

const ONE_DAY = days(1);

export const RateLimitAuthenticated: (
  limit?: number
) => MiddlewareFn<Context> = (limit = 50) => async (
  { context: { req }, info },
  next
) => {
  if (!isProduction()) {
    return next();
  }

  const key = `rate-limit:${info.fieldName}:${req.session.userId!}`;
  const current = await redis.incr(key);

  if (current > limit) {
    throw new Error("You're doing that too much");
  } else if (current === 1) {
    await redis.expire(key, ONE_DAY);
  }

  return next();
};

export const RateLimit: (limit?: number) => MiddlewareFn<Context> = (
  limit = 50
) => async ({ context: { req }, info }, next) => {
  if (!isProduction()) {
    return next();
  }

  const key = `rate-limit:${info.fieldName}:${req.ip}`;
  const current = await redis.incr(key);

  if (current > limit) {
    throw new Error("You're doing that too much");
  } else if (current === 1) {
    await redis.expire(key, ONE_DAY);
  }

  return next();
};
