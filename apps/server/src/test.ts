import type { FastifyInstance } from 'fastify';
import { PAGE_NUM, PAGE_SIZE, POSTS_INDEX } from './lib/constants';
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
  server.get('/search-sort', async (_, rpy) => {
    const res = await searchClient.index(POSTS_INDEX).search(null, {
      hitsPerPage: PAGE_SIZE,
      page: PAGE_NUM,
      sort: ['timestamp:desc'],
    });
    console.log('************');
    rpy.send(res);
    await rpy;
  });
  done();
}
