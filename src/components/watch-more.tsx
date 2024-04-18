'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

function WatchMore() {
  return (
    <motion.div
      className="text-2xl absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce"
      whileInView={{
        opacity: 0,
      }}
      viewport={{ margin: '0px 0px -100px 0px' }}
    >
      <MdOutlineKeyboardArrowDown />
    </motion.div>
  );
}

export default memo(WatchMore);
