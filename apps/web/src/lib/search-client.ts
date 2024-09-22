import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

const host = process.env.MEILI_HOST;

if (typeof host !== 'string' || host.length === 0) {
  console.error('meili host must be filled');
}

export const { searchClient: instantSearchClient } = instantMeiliSearch(
  host ?? '',
  process.env.MEILI_APIKEY,
);
