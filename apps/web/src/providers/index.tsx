import { PaschalProvider } from './paschal-provider';
import { PostMetadataProvider } from './post-metadata-provider';
import ScrollProvider from './scroll-provider';
import ThemeProvider from './theme-provider';
import { TopLoaderShowProvider } from './toploader-show-provider';

const providers = [
  ThemeProvider,
  TopLoaderShowProvider,
  PostMetadataProvider,
  PaschalProvider,
  ScrollProvider,
];

export default function ComposeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
  return providers.reduce((kids, Parent) => <Parent>{kids}</Parent>, children);
}
