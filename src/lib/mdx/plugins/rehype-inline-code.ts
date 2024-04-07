//参考 https://github.com/wevm/vocs/blob/75e0cfc874e7abe8648be139a8554e1fe87a18d1/src/vite/plugins/rehype/inline-shiki.ts

import { Element, Node, Parent } from 'hast';
import { SKIP, visit } from 'unist-util-visit';
import { bundledLanguages, getHighlighter, type Highlighter } from 'shiki';
import { SHIKI_THEMES } from '@/constants/shiki-themes';

const inlineRegex = /(.*){:(.*)}$/;

export default function rehypeInlineCode() {
  let promise: Promise<Highlighter>;
  return async (tree: Node) => {
    if (!promise) {
      promise = getHighlighter({
        langs: Object.keys(bundledLanguages),
        themes: Object.values(SHIKI_THEMES),
      });
    }
    const highlighter = await promise;
    visit(tree, 'element', (node: Element, index: number, parent: Parent) => {
      if (node.tagName !== 'code') return;
      const match = (node.children[0] as any)?.value?.match(inlineRegex);
      if (!match) return SKIP;
      const [_, code, lang] = match;
      const hast = highlighter.codeToHast(code, {
        lang: lang !== 'p' ? lang : 'plaintext',
        themes: SHIKI_THEMES,
      });
      const inlineCode = (hast.children[0] as any).children[0];
      inlineCode.properties.class = 'shiki';
      parent?.children.splice(index ?? 0, 1, inlineCode);
      return SKIP;
    });
  };
}
