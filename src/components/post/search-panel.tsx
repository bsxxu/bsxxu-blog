'use client';

import type { PostData } from '@/data/interfaces/post';
import useDebounceFn from '@/hooks/use-debounce-fn';
import Link from 'next/link';
import {
  Configure,
  Highlight,
  type InfiniteHitsProps,
  Snippet,
  useInfiniteHits,
  useSearchBox,
} from 'react-instantsearch';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type HitComponentType<T extends Record<string, any>> = NonNullable<
  InfiniteHitsProps<T>['hitComponent']
> extends React.JSXElementConstructor<infer P>
  ? P
  : never;
type HitType<T extends Record<string, any>> = HitComponentType<T>['hit'];

const SearchItem = ({ hit }: { hit: HitType<PostData> }) => {
  return (
    <Link
      href={`/post/${hit.key}`}
      className="group my-3 p-2 flex items-center justify-between rounded cursor-pointer hover:bg-muted"
    >
      <div>
        <Highlight
          hit={hit}
          attribute="title"
          classNames={{
            highlighted: 'bg-foreground text-background',
          }}
        />
        <Snippet
          hit={hit}
          attribute="content"
          className=" text-sm block pt-1"
          classNames={{
            highlighted: 'bg-foreground text-background',
          }}
        />
      </div>
      <div className="i-ri-arrow-right-up-line opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
};

export default function SearchPanel() {
  const { showMore, isLastPage, items } = useInfiniteHits<PostData>();
  const { refine } = useSearchBox();
  const debounceRefine = useDebounceFn(refine);

  return (
    <>
      <div className="relative">
        <Input
          type="search"
          className="pl-8"
          onChange={(e) => debounceRefine(e.target.value)}
        />
        <span className="absolute top-1/2 -translate-y-1/2 left-3 i-ri-search-2-line" />
      </div>
      <Configure hitsPerPage={5} attributesToSnippet={['content']} />
      <div className="max-h-[400px] overflow-auto scrollbar-none">
        {items.map((hit) => (
          <SearchItem key={hit.key} hit={hit} />
        ))}
        {!isLastPage && (
          <Button
            variant="outline"
            className="w-full mx-auto"
            onClick={showMore}
          >
            加载更多
          </Button>
        )}
      </div>
    </>
  );
}
