'use client';

import { success } from '@/lib/toast';
import { cm } from '@/utils/common';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RiFileCopyFill } from 'react-icons/ri';

export default function Pre(
  props: React.ComponentPropsWithoutRef<'pre'> & {
    ['data-lang']?: string;
  },
) {
  const { children, className, 'data-lang': dataLang, ...rest } = props;
  const lang = (dataLang ?? 'plaintext').toUpperCase();
  const ref = useRef<HTMLDivElement>(null);
  const [code, setCode] = useState('');
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    success('已复制到剪切板');
  }, [code]);

  useEffect(() => {
    ref.current && setCode(ref.current.textContent ?? '');
  }, []);

  return (
    <pre className={cm(className, 'relative group')} {...rest}>
      <button
        onClick={handleCopy}
        className="opacity-0 absolute top-1 right-1 transition-opacity text-lg text-ft-minor group-hover:opacity-100"
      >
        <RiFileCopyFill />
      </button>
      <span className="lang absolute right-1 bottom-1">{lang}</span>
      <div ref={ref}>{children}</div>
    </pre>
  );
}
