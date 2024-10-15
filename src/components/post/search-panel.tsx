'use client';

import {
  Configure,
  Highlight,
  InfiniteHits,
  type InfiniteHitsProps,
  SearchBox,
  Snippet,
  useInfiniteHits,
} from 'react-instantsearch';

import type { PostData } from '@/data/interfaces/post';
import Link from 'next/link';
import { Button } from '../ui/button';

type HitComponentType<T extends Record<string, any>> = NonNullable<
  InfiniteHitsProps<T>['hitComponent']
> extends React.JSXElementConstructor<infer P>
  ? P
  : never;
type HitType<T extends Record<string, any>> = HitComponentType<T>['hit'];

const SearchItem = ({ hit }: { hit: HitType<PostData> }) => {
  return (
    <Link
      href={`/blog/${hit.key}`}
      className="group my-3 p-2 flex items-center justify-between rounded cursor-pointer hover:bg-muted"
    >
      <div>
        <Highlight hit={hit} attribute="title" />
        <Snippet
          hit={hit}
          attribute="content"
          className=" text-sm block pt-1"
        />
      </div>
      <span className="hidden group-hover:inline-block i-ri-arrow-go-forward-line" />
    </Link>
  );
};

//TODO 用hook做防抖
export default function SearchPanel() {
  const { showMore, isLastPage } = useInfiniteHits();
  return (
    <>
      <SearchBox
        classNames={{
          form: 'relative h-12',
          input:
            'h-12 w-full outline-none absolute border-none py-2 pl-10 pr-7 bg-accent rounded-md',
          submit: 'absolute pl-10 top-1/2 -translate-y-1/2 i-ri-search-2-line',
          reset:
            'absolute i-radix-icons-cross-1 top-1/2 -translate-y-1/2 right-3',
        }}
      />
      <Configure hitsPerPage={3} attributesToSnippet={['content']} />
      <div className="max-h-[400px] overflow-auto scrollbar-none">
        <InfiniteHits
          hitComponent={SearchItem}
          classNames={{
            loadMore: 'hidden',
            loadPrevious: 'hidden',
          }}
        />
        {!isLastPage && (
          <Button className="w-full mx-auto" onClick={showMore}>
            加载更多
          </Button>
        )}
      </div>
    </>
  );
}
