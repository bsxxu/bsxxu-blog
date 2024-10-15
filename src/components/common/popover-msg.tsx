'use client';

import { useThrottle } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

//TODO msg的位置
export default function PopoverMsg({
  msg,
  duration = 1,
  children,
}: {
  msg: string;
  duration?: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const handleClick = useThrottle(() => {
    setOpen(true);
    setTimeout(() => setOpen(false), duration * 1000);
  });

  return (
    <Popover open={open}>
      <PopoverTrigger asChild onClick={handleClick}>
        {children}
      </PopoverTrigger>
      <PopoverContent asChild side="top" className="font-semibold text-sm">
        <motion.div
          initial={{
            y: 10,
          }}
          animate={{
            y: -15,
          }}
        >
          {msg}
        </motion.div>
      </PopoverContent>
    </Popover>
  );
}
