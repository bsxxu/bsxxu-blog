import env from '@/lib/env';
import { ComposeContextProvider } from 'foxact/compose-context-provider';
import {
  BlogMetadataProvider,
  PaschalProvider,
} from './context-state-provider';
import ReactQueryProvider from './react-query-provider';
import ScrollProvider from './scroll-provider';
import SearchProvider from './search-provider';
import ThemeProvider from './theme-provider';

const providers = [
  <ThemeProvider key="theme" />,
  <PaschalProvider key="paschal" />,
  <ScrollProvider key="scroll" />,
  <BlogMetadataProvider key="blogMetadata" />,
  <SearchProvider
    host={`http://${env.MEILI_HOST}:${env.MEILI_PORT}`}
    apikey={env.MEILI_MASTER_KEY}
    key="search"
  />,
  <ReactQueryProvider key="query" />,
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
