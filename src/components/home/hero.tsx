'use client';

import Image from 'next/image';
import avatar from '@/assets/avatar.jpg';
import { motion } from 'framer-motion';
import PopoverMsg from '../popover-msg';
import { useCallback, useState } from 'react';
import Ripple from '../motion/ripple';
import { throttled } from '@/utils/common';

const msgs = ['hello!', '做什么?', '看点啥?', '睡会儿吧...'];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClick = useCallback(
    throttled(() => setIdx(~~(Math.random() * msgs.length)), 1000),
    [],
  );

  return (
    <div className="h-1/5 w-full flex items-center justify-between px-16">
      <div className="space-y-3">
        <div className="font-semibold text-4xl">Hi there 👋, I&apos;m Bsx.</div>
        <div className="text-lg">A budding front-end developer</div>
      </div>
      <PopoverMsg msg={msgs[idx]}>
        <motion.button
          initial={{
            scale: 0.9,
          }}
          animate={{
            scale: 1,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          onClick={handleClick}
        >
          <Ripple />
          <Image src={avatar} alt="avatar" className="w-72 h-72 rounded-full" />
        </motion.button>
      </PopoverMsg>
    </div>
  );
}
