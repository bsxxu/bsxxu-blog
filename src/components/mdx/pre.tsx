'use client';

import { useToast } from '@/hooks/use-toast';
import { useClipboard } from 'foxact/use-clipboard';
import { useCallback, useState } from 'react';

//TODO 代码展开收起
//TODO 滚动条
export default function Pre(
  props: React.ComponentPropsWithoutRef<'pre'> & {
    ['data-lang']?: string;
  },
) {
  const { children, 'data-lang': dataLang, ...rest } = props;
  const lang = (dataLang ?? 'plaintext').toUpperCase();
  const [code, setCode] = useState('');
  const { toast } = useToast();
  const { copy } = useClipboard({
    onCopyError(error) {
      toast({
        variant: 'destructive',
        title: 'Copy to clipboard failed.',
        description: error.message,
      });
    },
  });

  return (
    <div className="relative group">
      <pre {...rest}>
        <button
          onClick={() =>
            copy(code).then(() =>
              toast({
                description: 'Copy to clipboard successfully.',
              }),
            )
          }
          className="opacity-0 absolute top-1 right-1 transition-opacity text-lg text-muted-foreground group-hover:opacity-100 hover:text-muted-foreground/50 z-10"
        >
          <div className="i-ri-file-copy-fill" />
        </button>
        <span className="lang absolute right-2 bottom-3">{lang}</span>
        <div
          ref={useCallback((node: HTMLDivElement) => {
            node && setCode(node.textContent ?? '');
          }, [])}
        >
          {children}
        </div>
      </pre>
    </div>
  );
}
