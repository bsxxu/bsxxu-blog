import type { getAllPost } from '@/lib/mdx';
import Link from 'next/link';
import type { Dispatch, SetStateAction } from 'react';
import {
  RiArrowUpDownFill,
  RiLayoutRowLine,
  RiMenuLine,
  RiSearch2Line,
} from 'react-icons/ri';
import AnimateView from './animate-view';
import FuseSearch from './fuse-search';
import ModelView from './model-view';
import ClickView from './motion/click-view';

export default function SideMenu({
  setComplex,
  setNewToOld,
  isComplex,
  posts,
}: {
  setComplex: Dispatch<SetStateAction<boolean>>;
  setNewToOld: Dispatch<SetStateAction<boolean>>;
  isComplex: boolean;
  posts: ReturnType<typeof getAllPost>;
}) {
  return (
    <AnimateView
      as="div"
      className="sticky top-20 self-start flex flex-col gap-3"
      motionProps={{
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
      }}
    >
      <ClickView as="button" onClick={() => setComplex((c) => !c)}>
        {isComplex ? <RiMenuLine /> : <RiLayoutRowLine />}
      </ClickView>
      <ModelView
        content={
          <FuseSearch
            items={posts}
            keys={['title', 'tags', 'description']}
            renderer={(item) => (
              <div
                key={item.title}
                className="space-y-1 transition-colors hover:bg-bk-minor p-1 rounded"
              >
                <Link href={`/blog/${item.slug}`} className="hover:underline">
                  {item.title}
                </Link>
                <div className="line-clamp-2 text-xs text-ft-minor">
                  {item.description}
                </div>
              </div>
            )}
          />
        }
      >
        <ClickView as="button">
          <RiSearch2Line />
        </ClickView>
      </ModelView>
      <ClickView as="button" onClick={() => setNewToOld((n) => !n)}>
        <RiArrowUpDownFill />
      </ClickView>
    </AnimateView>
  );
}
