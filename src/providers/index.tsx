import { PostMetadataProvider } from './post-metadata-provider';
import ThemeProvider from './theme-provider';
import { TopLoaderShowProvider } from './toploader-show-provider';

const providers = [ThemeProvider, TopLoaderShowProvider, PostMetadataProvider];

export default function ComposeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return providers.reduce((kids, Parent) => <Parent>{kids}</Parent>, children);
}
