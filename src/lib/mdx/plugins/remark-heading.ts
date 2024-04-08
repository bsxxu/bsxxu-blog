//参考 https://github.com/tszhong0411/honghong.me/blob/main/packages/mdx/src/plugins/remark/remark-heading.ts

import { visit, SKIP } from 'unist-util-visit';
import { Heading, Node, Code } from 'mdast';
import { toString } from 'mdast-util-to-string';
import GithubSlugger from 'github-slugger';

const slugger = new GithubSlugger();

export type TocHeading = {
  title: string;
  slug: string;
  depth: number;
};

export default function remarkHeading() {
  return (tree: Node, file: any) => {
    slugger.reset();
    const headings: TocHeading[] = [];
    visit(tree, 'heading', (node: Heading) => {
      node.data ??= {};
      node.data.hProperties ??= {};
      const title = toString(node, { includeImageAlt: false });
      const slug = slugger.slug(title);
      node.data.hProperties.id = slug;
      headings.push({ title, slug, depth: node.depth });
      return SKIP;
    });
    file.data.headings = headings;
  };
}
