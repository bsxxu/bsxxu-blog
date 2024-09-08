import type { ReactHTML } from 'react';
import AnimateView from '../animate-view';
import type { AnimatePropsWithoutMotion } from './type';

export default function DownToTopView<T extends keyof ReactHTML>({
  children,
  as,
  delay = 0,
  ...rest
}: AnimatePropsWithoutMotion<T> & {
  delay?: number;
}) {
  return (
    <AnimateView
      as={as as any}
      motionProps={{
        initial: {
          y: 50,
          opacity: 0,
        },
        whileInView: {
          y: 0,
          opacity: 1,
        },
        transition: {
          duration: 0.5,
          delay: delay,
          ease: 'easeOut',
        },
        viewport: {
          once: true,
        },
      }}
      {...rest}
    >
      {children}
    </AnimateView>
  );
}
