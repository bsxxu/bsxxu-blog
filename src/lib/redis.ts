import { createClient } from 'redis';
import env from './env';

const redis = createClient({
  url: `redis://:${env.REDIS_PASSWORD}@${env.REDIS_HOST}:${env.REDIS_PORT}`,
});

async function connect() {
  if (!redis.isReady) {
    await redis.connect();
  }
}

async function set(key: string, value: string) {
  await connect();
  return redis.set(key, value);
}

async function get(key: string) {
  await connect();
  return redis.get(key);
}

async function del(key: string) {
  await connect();
  return redis.del(key);
}

async function setEx(key: string, seconds: number, value: string) {
  await connect();
  return redis.setEx(key, seconds, value);
}

async function keys(pattern: string) {
  await connect();
  return redis.keys(pattern);
}

export default {
  set,
  get,
  del,
  setEx,
  keys,
};
