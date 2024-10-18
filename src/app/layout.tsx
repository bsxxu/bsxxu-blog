import { sansFont } from '@/lib/fonts';
import ComposeProvider from '@/providers';
import { Toaster } from 'react-hot-toast';
import '@/styles/index.css';
import '@/lib/env';
import Background from '@/components/common/backgroud';
import Footer from '@/components/common/footer';
import Header from '@/components/common/header';

//TODO seo

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh"
      className={`${sansFont.variable} scroll-smooth scrollbar-thin font-sans antialiased `}
    >
      <body className="bg-background text-foreground transition-colors">
        <ComposeProvider>
          <Toaster />
          <Header />
          <Background />
          <main className="max-w-5xl mx-auto min-h-screen">{children}</main>
          <Footer />
        </ComposeProvider>
      </body>
    </html>
  );
}
