import Header from '@/components/header';
import TopLoader from '@/components/top-loader';
import ComposeProvider from '@/providers';
import '@/styles/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className="scroll-smooth">
      <body>
        <ComposeProvider>
          <TopLoader />
          <Header />
          <main className="max-w-5xl mx-auto">{children}</main>
        </ComposeProvider>
      </body>
    </html>
  );
}
