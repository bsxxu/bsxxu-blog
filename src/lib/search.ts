import { MeiliSearch } from 'meilisearch';
import { MEILI_APIKEY, MEILI_HOST } from './env';

export const searchClient = new MeiliSearch({
  host: MEILI_HOST,
  apiKey: MEILI_APIKEY,
});
