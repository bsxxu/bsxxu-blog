import { MEILI_APIKEY, MEILI_HOST } from '@/lib/env';
import { ComposeContextProvider } from 'foxact/compose-context-provider';
import {
  BlogMetadataProvider,
  PaschalProvider,
} from './context-state-provider';
import ScrollProvider from './scroll-provider';
import SearchProvider from './search-provider';
import ThemeProvider from './theme-provider';

const providers = [
  <ThemeProvider key="theme" />,
  <PaschalProvider key="paschal" />,
  <ScrollProvider key="scroll" />,
  <BlogMetadataProvider key="blogMetadata" />,
  <SearchProvider host={MEILI_HOST} apikey={MEILI_APIKEY} key="search" />,
];

export default function ComposeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ComposeContextProvider contexts={providers}>
      {children}
    </ComposeContextProvider>
  );
}
