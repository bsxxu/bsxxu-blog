import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { syncSearch } from './search';

export function registerHooks(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done: (err?: Error) => void,
) {
  fastify.register(syncSearch);
  done();
}
