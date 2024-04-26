import { useState } from 'react';
import Fuse from 'fuse.js';

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
  const [filteredItems, setFilteredItems] = useState(items);
  const [search, setSearch] = useState('');
  const doFilter = () => {
    const fuse = new Fuse(items, {
      keys: keys as any,
    });
    setFilteredItems(fuse.search(search).map(r => r.item) ?? []);
  };
  return (
    <div className={wrapperClassName}>
      <input />
      <div>{items.map(i => renderer(i))}</div>
    </div>
  );
}
