import { SHIKI_THEMES } from '@/constants/shiki-themes';
import rehypeShiki, { RehypeShikiOptions } from '@shikijs/rehype';

const shortCase = new Map([
  ['javascript', 'js'],
  ['typescript', 'ts'],
]);

const rehypeCode: [any, RehypeShikiOptions] = [
  rehypeShiki,
  {
    themes: SHIKI_THEMES,
    transformers: [
      {
        pre(node) {
          node.properties['data-lang'] =
            shortCase.get(this.options.lang.toLowerCase()) ?? this.options.lang;
        },
      },
    ],
  },
];

export default rehypeCode;
