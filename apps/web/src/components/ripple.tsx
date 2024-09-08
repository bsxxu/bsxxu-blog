'use client';

import { throttled } from '@/utils/common';
import { type HTMLMotionProps, motion } from 'framer-motion';
import { memo, useCallback, useState } from 'react';

//秒
function Ripple({ duration = 0.5 }: { duration?: number }) {
  const [p, setP] = useState<HTMLMotionProps<'div'>['animate']>({
    opacity: 0,
    scale: 1,
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClick = useCallback(
    throttled(() => {
      setP({
        opacity: [1, 0],
        scale: 1.2,
      });
      setTimeout(
        () =>
          setP({
            opacity: 0,
            scale: 1,
          }),
        duration * 1000,
      );
    }, duration * 1500),
    [],
  );

  return (
    <motion.div
      className="absolute inset-0 border border-ft-minor rounded-full"
      animate={p}
      onClick={handleClick}
      transition={{
        duration: duration,
        ease: 'easeOut',
      }}
    />
  );
}

export default memo(Ripple);
