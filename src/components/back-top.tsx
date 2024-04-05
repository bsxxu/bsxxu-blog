'use client';

import { cm } from '@/utils/common';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { RxArrowUp } from 'react-icons/rx';
import { useState } from 'react';

export default function BackTop(
  props: React.ComponentPropsWithoutRef<'button'>,
) {
  const { className, ...rest } = props;
  const { scrollYProgress } = useScroll();
  const [show, setShow] = useState(true);
  useMotionValueEvent(scrollYProgress, 'change', latest =>
    latest >= 0.1 ? setShow(true) : setShow(false),
  );

  return (
    <button
      className={cm(
        'transition-opacity hover:text-ft flex items-center gap-2',
        { 'opacity-0': !show },
        className,
      )}
      onClick={() => window.scrollTo({ top: 0 })}
      {...rest}
    >
      <RxArrowUp />
      回到顶部
    </button>
  );
}
