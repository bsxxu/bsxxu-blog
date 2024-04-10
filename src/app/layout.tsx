import Header from '@/components/header/header';
import TopLoader from '@/components/top-loader';
import ComposeProvider from '@/providers';
import { Toaster } from 'react-hot-toast';
import { sansFont } from '@/lib/fonts';
import '@/styles/index.css';

//TODO seo

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className={`${sansFont.variable} scroll-smooth font-sans`}>
      <body className="bg-bk text-ft transition-colors">
        <ComposeProvider>
          <Toaster />
          <TopLoader />
          <Header />
          <main className="max-w-5xl mx-auto">{children}</main>
        </ComposeProvider>
      </body>
    </html>
  );
}
