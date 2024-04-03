import { Heading } from '@vcarl/remark-headings';

export default function Toc({ headings }: { headings: Heading[] }) {
  const min = Math.min(...headings.map(h => h.depth));
  headings = headings.map(h => ({ ...h, depth: h.depth - min }));

  return (
    <div className="p-2 sticky top-20 min-w-44 self-start">
      <div>Table of Contents</div>
      {headings.map(h => (
        <a
          key={h.value}
          href={`#${h.value}`}
          className="block whitespace-nowrap"
          style={{ paddingLeft: h.depth * 20 }}
        >
          {h.value}
        </a>
      ))}
    </div>
  );
}
