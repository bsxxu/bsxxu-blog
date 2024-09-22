import { ComposeContextProvider } from 'foxact/compose-context-provider';
import {
  BlogMetadataProvider,
  PaschalProvider,
} from './context-state-provider';
import ScrollProvider from './scroll-provider';
import ThemeProvider from './theme-provider';

const providers = [
  <ThemeProvider key="theme" />,
  <PaschalProvider key="paschal" />,
  <ScrollProvider key="scroll" />,
  <BlogMetadataProvider key="blogMetadata" />,
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
