import { cm } from '@/utils/common';
import Fuse from 'fuse.js';
import { useMemo, useState } from 'react';

export default function FuseSearch<
  T extends Record<string, any>,
  K extends keyof T,
>({
  items,
  renderer,
  keys,
  wrapperClassName,
}: {
  items: T[];
  renderer: (item: T) => JSX.Element;
  keys: K[];
  wrapperClassName?: string;
}) {
  const [search, setSearch] = useState('');
  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: keys as any,
      }),
    [items, keys],
  );
  const filteredItems = useMemo(
    () => fuse.search(search).map((r) => r.item) ?? [],
    [fuse, search],
  );

  return (
    <div
      className={cm(
        'bg-transparent rounded-md border border-bk-minor min-w-[700px] h-[400px]',
        wrapperClassName,
      )}
    >
      <div className="absolute rounded-md -z-10 inset-0 bg-bk/50  backdrop-blur " />
      <input
        className="w-full bg-transparent outline-none p-2 px-5 border-b border-bk-minor"
        placeholder="Search..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
      <div className="space-y-3 p-4 max-h-[350px] overflow-auto scrollbar-thin">
        {filteredItems.map((i) => renderer(i))}
      </div>
    </div>
  );
}
