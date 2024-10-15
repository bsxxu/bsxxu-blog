import clsx from 'clsx';
import * as motion from 'framer-motion/client';

export default function ClickView({
  children,
  onClick = undefined,
  className,
}: {
  children: React.ReactNode;
  onClick?: (...args: any[]) => any;
  className?: string;
}) {
  return (
    <motion.div
      className={clsx('cursor-pointer', className)}
      onClick={onClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
}
