import * as motion from 'framer-motion/client';

export default function P(props: React.ComponentPropsWithoutRef<'p'>) {
  const { children, ...rest } = props;
  return (
    <motion.p
      initial={{ y: 15 }}
      whileInView={{ y: 0 }}
      viewport={{
        once: true,
      }}
      {...(rest as any)}
    >
      {children}
    </motion.p>
  );
}
