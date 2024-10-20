import PostHeader from '@/components/post/post-header';
import ProgressBar from '@/components/post/progress-bar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProgressBar />
      <PostHeader />
      {children}
    </>
  );
}
