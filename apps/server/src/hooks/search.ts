import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { POSTS_INDEX } from '../lib/constants';
import { searchClient } from '../lib/search';
import { getAllPost } from '../lib/utils';

export function syncSearch(
  fastify: FastifyInstance,
  _: FastifyPluginOptions,
  done: (err?: Error) => void,
) {
  fastify.addHook('onReady', async () => {
    try {
      await searchClient.index(POSTS_INDEX).deleteAllDocuments();
      await searchClient.deleteIndex(POSTS_INDEX);
      await searchClient.createIndex(POSTS_INDEX, { primaryKey: 'key' });
      await searchClient
        .index(POSTS_INDEX)
        .updateSortableAttributes(['timestamp']);
      const docs = await getAllPost();
      await searchClient.index(POSTS_INDEX).addDocuments(docs);
      fastify.log.info('meilisearch has been synchronized');
    } catch (e) {
      fastify.log.error(e);
      fastify.log.error('meilisearch sync failed');
    }
  });
  done();
}
