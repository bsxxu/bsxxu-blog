import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { syncMeiliSearch } from './meilisearch';

export function registerHooks(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done: (err?: Error) => void,
) {
  fastify.register(syncMeiliSearch);
  done();
}
