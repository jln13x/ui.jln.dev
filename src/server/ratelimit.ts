import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { TABLE_NAME } from "project.config";

const redis = Redis.fromEnv();

const createPrefix = (prefix: string) => {
  return `${TABLE_NAME}:${prefix}`;
};

export const saveThemePublicRateLimit = new Ratelimit({
  redis,
  prefix: createPrefix("save-theme-public"),
  limiter: Ratelimit.slidingWindow(50, "15m"),
});

export const changeVisiblityRateLimit = new Ratelimit({
  redis,
  prefix: createPrefix("change-visibility"),
  limiter: Ratelimit.slidingWindow(5, "15m"),
});

export const starRateLimit = new Ratelimit({
  redis,
  prefix: createPrefix("star-theme"),
  limiter: Ratelimit.slidingWindow(5, "15m"),
});
