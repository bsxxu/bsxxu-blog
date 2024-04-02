import Header from '@/components/header';
import TopLoader from '@/components/top-loader';
import '@/styles/globals.css';
import { Provider } from 'jotai';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className="scroll-smooth">
      <Provider>
        <body>
          <TopLoader />
          <Header />
          <main className="max-w-5xl mx-auto">{children}</main>
        </body>
      </Provider>
    </html>
  );
}
