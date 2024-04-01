import TopLoaderCtrl from '@/components/top-loader-ctrl';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <TopLoaderCtrl />
    </>
  );
}
