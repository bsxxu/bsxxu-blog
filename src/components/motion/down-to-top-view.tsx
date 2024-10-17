import * as motion from 'framer-motion/client';

export default function DownToTopView({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{
        y: 50,
        opacity: 0,
      }}
      whileInView={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: 'easeOut',
      }}
      viewport={{
        once: true,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
