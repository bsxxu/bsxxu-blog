import ProgressBar from '@/components/progress-bar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProgressBar />
      {children}
    </>
  );
}
