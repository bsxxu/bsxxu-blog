import { getAllPost } from '@/lib/mdx';
import AnimateView from '../motion/animate-view';
import WatchMore from '../motion/watch-more';

export default async function Recently() {
  const posts = await getAllPost().slice(0, 3);
  return (
    <AnimateView
      as="div"
      className="relative h-1/5 w-full p-32"
      motionProps={{
        initial: {
          y: 50,
          opacity: 0,
        },
        whileInView: {
          y: 0,
          opacity: 1,
        },
        transition: {
          duration: 0.5,
          delay: 0.5,
          ease: 'easeOut',
        },
      }}
    >
      <div className="text-center font-semibold text-2xl">最新文章</div>
      {posts.map(p => (
        <div key={p.title}>{p.title}</div>
      ))}
      <WatchMore />
    </AnimateView>
  );
}
