import { searchConfig } from '@/configs/index.config';
import { MeiliSearch } from 'meilisearch';

export const searchClient = new MeiliSearch({
  host: searchConfig.host,
  apiKey: searchConfig.apikey,
});
