import ThemeProvider from './theme-provider';
import { Provider as JotaiProvider } from 'jotai';

const providers = [ThemeProvider, JotaiProvider];

export default function ComposeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return providers.reduce((kids, Parent) => <Parent>{kids}</Parent>, children);
}
