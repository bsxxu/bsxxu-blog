'use client';

import type { HTMLMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';
import { ReactHTML, ComponentPropsWithoutRef } from 'react';

export default function AnimateView<T extends keyof ReactHTML>({
  children,
  as,
  motionProps,
  ...rest
}: {
  motionProps?: HTMLMotionProps<T>;
  as: T;
} & ComponentPropsWithoutRef<T>) {
  const M = motion[as as keyof typeof motion];
  return (
    <M {...(motionProps as any)} {...rest}>
      {children}
    </M>
  );
}
