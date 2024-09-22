import { instantSearchClient } from '@/lib/search-client';
import { useEffect } from 'react';
import { InstantSearch } from 'react-instantsearch';

export default function SearchProvider({
  children,
}: { children: React.ReactNode }) {
  return (
    <InstantSearch indexName="posts" searchClient={instantSearchClient}>
      {children}
    </InstantSearch>
  );
}
