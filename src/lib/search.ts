import { MeiliSearch } from 'meilisearch';
import env from './env';

export const searchClient = new MeiliSearch({
  host: `http://${env.MEILI_HOST}:${env.MEILI_PORT}`,
  apiKey: env.MEILI_MASTER_KEY,
});
