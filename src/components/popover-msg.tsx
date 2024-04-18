'use client';

import * as Popover from '@radix-ui/react-popover';
import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { throttled } from '@/utils/common';

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClick = useCallback(
    throttled(() => {
      setOpen(true);
      setTimeout(() => setOpen(false), duration * 1000);
    }, duration * 1000),
    [],
  );
  return (
    <Popover.Root open={open}>
      <Popover.Trigger asChild onClick={handleClick}>
        {children}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content asChild side="top" className="font-semibold text-sm">
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
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
