import { MeiliSearch } from 'meilisearch';
import env from './env';

export const searchClient = new MeiliSearch({
  host: env.MEILI_HOST,
  apiKey: env.MEILI_MASTER_KEY,
});
