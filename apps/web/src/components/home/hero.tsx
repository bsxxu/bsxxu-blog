'use client';

import avatar from '@/assets/avatar.jpg';
import { getTime, useThrottle } from '@/lib/utils';
import { useSetPaschal } from '@/providers/context-state-provider';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PopoverMsg from '../common/popover-msg';
import DownToTopView from '../motion/down-to-top-view';
import { Eggs } from '../paschal-eggs';
import Ripple from './ripple';
import WatchMore from './watch-more';

const msgs = ['hello!', '做什么?', '看点啥?', '睡会儿吧...'];
const TZ = 'Asia/Shanghai';
const TP = 'DD/h:mm A';

//TODO 抽象动画组件
//TODO 头像整个点击提示
export default function Hero() {
  const setPaschal = useSetPaschal();
  const [idx, setIdx] = useState(0);
  const [time, setTime] = useState(getTime(TZ, TP));
  const [count, setCount] = useState(0);

  const handleClick = useThrottle(() => {
    setCount((pre) => pre + 1);
    setIdx(~~(Math.random() * msgs.length));
  });

  //进入彩蛋osu
  useEffect(() => {
    if (count >= 6) {
      setPaschal(Eggs.OSU);
      setCount(0);
    }
  }, [count, setPaschal]);

  useEffect(() => {
    const timer = setInterval(() => setTime(getTime(TZ, TP)), 15 * 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <DownToTopView className="min-h-screen w-full flex flex-col-reverse justify-center items-center gap-10 md:flex-row md:justify-between px-16">
      <div className="space-y-3 text-center md:text-start">
        <div className="font-semibold text-4xl">Hi there 👋, I&apos;m Bsx.</div>
        <div className="text-lg">
          A budding front-end developer, who works hard to get better.
        </div>
        <div className="text-xs text-muted-foreground">{time} · UTC/GMT +8</div>
        <div className="flex items-center justify-center md:justify-start text-2xl gap-3">
          <Link href="https://www.github.com/BsXwerse" target="_blank">
            <span className="i-ri-github-fill" />
          </Link>
          <Link href="https://twitter.com/bsx_jzb0" target="_blank">
            <span className="i-ri-twitter-x-fill" />
          </Link>
          <Link href="mailto:Bsx<bsx_homu@163.com>" target="_blank">
            <span className="i-ri-mail-fill" />
          </Link>
          <Link href="https://t.me/bsxxu" target="_blank">
            <span className="i-ri-telegram-fill" />
          </Link>
        </div>
      </div>
      <PopoverMsg msg={msgs[idx]}>
        <motion.button
          initial={{
            scale: 0.9,
          }}
          animate={{
            scale: 1,
          }}
          whileTap={{
            opacity: 0.8,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          onClick={handleClick}
          className="shrink-0"
        >
          <Ripple />
          <Image
            src={avatar}
            alt="avatar"
            className="w-64 h-64 rounded-full shrink-0"
          />
        </motion.button>
      </PopoverMsg>
      <WatchMore />
    </DownToTopView>
  );
}
