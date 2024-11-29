import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import HeaderShow from '@/components/common/header-show';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderShow>
        <Header />
      </HeaderShow>
      {children}
      <Footer />
    </>
  );
}
