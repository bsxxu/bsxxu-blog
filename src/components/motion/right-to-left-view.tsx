import * as motion from 'framer-motion/client';

export default function RightToLeftView({
  children,
  className,
}: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
    >
      {children}
    </motion.div>
  );
}
