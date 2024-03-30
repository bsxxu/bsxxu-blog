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
      <body>
        <Header />
        <NextTopLoader />
        {children}
      </body>
    </html>
  );
}
