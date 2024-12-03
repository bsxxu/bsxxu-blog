import { sansFont } from '@/lib/fonts';
import ComposeProvider from '@/providers';
import '@/styles/index.css';
import '@/lib/env';
import { Toaster } from '@/components/ui/toaster';

//TODO seo

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh"
      className={`${sansFont.variable} scroll-smooth scrollbar-thin font-sans antialiased dark`}
    >
      <body className="bg-background text-foreground transition-colors">
        <ComposeProvider>
          <Toaster />
          {children}
        </ComposeProvider>
      </body>
    </html>
  );
}
