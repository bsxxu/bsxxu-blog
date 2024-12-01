import env from '@/lib/env';
import { ComposeContextProvider } from 'foxact/compose-context-provider';
import AuthProvider from './auth-provider';
import ScrollProvider from './scroll-provider';
import SearchProvider from './search-provider';
import ThemeProvider from './theme-provider';
import TrpcProvider from './trpc-provider';

const providers = [
  <ThemeProvider key="theme" />,
  <ScrollProvider key="scroll" />,
  <SearchProvider
    host={`${env.BLOG_URL}/meilisearch`}
    apikey={env.MEILI_MASTER_KEY}
    key="search"
  />,
  <TrpcProvider key="query" />,
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
