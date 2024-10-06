import * as motion from 'framer-motion/client';
import { memo } from 'react';

function WatchMore() {
  return (
    <motion.div
      className="text-2xl absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce"
      whileInView={{
        opacity: 0,
      }}
      viewport={{ margin: '0px 0px -100px 0px' }}
    >
      <span className="i-ri-arrow-drop-down-line" />
    </motion.div>
  );
}

export default memo(WatchMore);
