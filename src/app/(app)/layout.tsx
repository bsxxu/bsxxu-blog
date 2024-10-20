import BgDot from '@/components/common/bg-dot';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BgDot />
      {children}
    </>
  );
}
