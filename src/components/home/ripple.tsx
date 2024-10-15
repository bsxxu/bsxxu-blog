'use client';

import { useThrottle } from '@/lib/utils';
import { type HTMLMotionProps, motion } from 'framer-motion';
import { memo, useState } from 'react';

//秒
function Ripple({ duration = 0.5 }: { duration?: number }) {
  const [p, setP] = useState<HTMLMotionProps<'div'>['animate']>({
    opacity: 0,
    scale: 1,
  });

  const handleClick = useThrottle(() => {
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
  });

  return (
    <motion.div
      className="absolute inset-0 border border-muted-foreground rounded-full"
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
