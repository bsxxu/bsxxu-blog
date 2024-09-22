import type { FastifyInstance } from 'fastify';
import { POSTS_INDEX } from './lib/constants';
import { searchClient } from './lib/search';
import { getAllPost } from './lib/utils';

export default function test(
  server: FastifyInstance,
  _: any,
  done: () => void,
) {
  server.get('/test', async (req, rpy) => {
    const res = await searchClient.getIndexes({ limit: 20 });
    rpy.send(res);
    await rpy;
  });
  server.post('/test', async (req, rpy) => {
    const res = await searchClient.createIndex(POSTS_INDEX, {
      primaryKey: 'key',
    });
    rpy.send(res);
    await rpy;
  });
  server.post('/add-doc', async (_, rpy) => {
    const docs = await getAllPost();
    const res = await searchClient.index(POSTS_INDEX).addDocuments(docs);
    rpy.send(res);
    await rpy;
  });
  server.get('/get-docs', async (_, rpy) => {
    const res = await searchClient.index(POSTS_INDEX).getDocuments();
    rpy.send(res);
    await rpy;
  });
  server.get('/search-test', async (_, rpy) => {
    const res = await searchClient.index(POSTS_INDEX).searchGet('linux');
    rpy.send(res);
    await rpy;
  });
  done();
}
