import Header from '@/components/header';
import './styles/globals.css';
import NextTopLoader from 'nextjs-toploader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className="min-h-screen w-full flex items-center justify-center">
        <Header />
        <NextTopLoader />
        {children}
      </body>
    </html>
  );
}
