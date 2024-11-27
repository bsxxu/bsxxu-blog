import env from '@/lib/env';
import { ComposeContextProvider } from 'foxact/compose-context-provider';
import AuthProvider from './auth-provider';
import { BlogMetadataProvider } from './context-state-provider';
import ReactQueryProvider from './react-query-provider';
import ScrollProvider from './scroll-provider';
import SearchProvider from './search-provider';
import ThemeProvider from './theme-provider';

const providers = [
  <ThemeProvider key="theme" />,
  <ScrollProvider key="scroll" />,
  <BlogMetadataProvider key="blogMetadata" />,
  <SearchProvider
    host={`${env.BLOG_URL}/api/search`}
    apikey={env.MEILI_MASTER_KEY}
    key="search"
  />,
  <ReactQueryProvider key="query" />,
  <AuthProvider key="auth" />,
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
