import { Dispatch, SetStateAction } from 'react';
import {
  RiSearch2Line,
  RiMenuLine,
  RiLayoutRowLine,
  RiArrowUpDownFill,
} from 'react-icons/ri';
import AnimateView from './animate-view';
import ModelView from './model-view';
import FuseSearch from './fuse-search';
import { getAllPost } from '@/lib/mdx';
import Link from 'next/link';

function ButtonAnimateView({
  children,
  onClick = () => {},
}: {
  children: React.ReactNode;
  onClick?: (...args: any[]) => any;
}) {
  return (
    <AnimateView
      as="button"
      onClick={onClick}
      motionProps={{
        whileHover: { scale: 1.15 },
        whileTap: { scale: 0.9 },
        transition: { type: 'spring', stiffness: 400, damping: 17 },
      }}
    >
      {children}
    </AnimateView>
  );
}

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
      <ButtonAnimateView onClick={() => setComplex(c => !c)}>
        {isComplex ? <RiMenuLine /> : <RiLayoutRowLine />}
      </ButtonAnimateView>
      <ModelView
        content={
          <FuseSearch
            items={posts}
            keys={['title', 'tags', 'description']}
            renderer={item => (
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
        <ButtonAnimateView>
          <RiSearch2Line />
        </ButtonAnimateView>
      </ModelView>
      <ButtonAnimateView onClick={() => setNewToOld(n => !n)}>
        <RiArrowUpDownFill />
      </ButtonAnimateView>
    </AnimateView>
  );
}
