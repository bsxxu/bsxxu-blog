import { MeiliSearch } from 'meilisearch';
import { searchConfig } from '../configs/index.config';

export const searchClient = new MeiliSearch({
  host: searchConfig.host,
  apiKey: searchConfig.apikey,
});
