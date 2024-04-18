import Link from 'next/link';
import Carousel from '../carousel';
import AnimateView from '../animate-view';
import WatchMore from '../watch-more';
import artworks from '@/lib/artworks';

export default function Gallery() {
  return (
    <AnimateView
      as="div"
      className="relative h-1/4 w-full flex flex-col items-center justify-center"
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
        viewport: {
          once: true,
        },
      }}
    >
      <div className="font-semibold text-2xl">画廊</div>
      <Carousel
        containerWidth={600}
        containerHeight={400}
        imageHeight={240}
        imageWidth={200}
        dataSource={artworks}
      />
      <div className="font-semibold py-3 mt-5">
        <Link
          href="/gallery"
          className="p-2 hover:bg-bk-minor transition-colors rounded-md border border-bk-minor"
        >
          Detail..
        </Link>
      </div>
      <WatchMore />
    </AnimateView>
  );
}
