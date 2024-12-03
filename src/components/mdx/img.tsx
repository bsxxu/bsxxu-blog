'use client';

import trpc from '@/lib/trpc/client';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Skeleton } from '../ui/skeleton';

export default function Img({
  src,
  postKey,
}: { src?: string; postKey: string }) {
  const fileName = (src ?? '').split('/').pop()?.split('.').shift();
  const [isLoading, setIsLoading] = useState(true);

  if (!fileName || fileName === '')
    return (
      <div className="w-full aspect-video border flex items-center justify-center rounded-lg">
        图片地址为空
      </div>
    );

  const {
    data: url,
    isLoading: isUrlLoading,
    error,
  } = trpc.post.getImageUrl.useQuery(
    {
      postKey,
      name: fileName,
    },
    {
      staleTime: 600 * 1000,
    },
  );

  if (error)
    return (
      <div className="w-full aspect-video border flex items-center justify-center rounded-lg">
        图片加载失败
      </div>
    );

  const loading = isLoading || isUrlLoading;

  return (
    <div className={cn('relative w-full', { 'aspect-video': loading })}>
      {loading && <Skeleton className="w-full aspect-video absolute" />}
      {url && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: loading ? 0 : 1, y: loading ? 50 : 0 }}
        >
          <Image
            onLoad={() => setIsLoading(false)}
            src={url}
            width={700}
            height={700}
            alt={fileName}
            className="w-full"
          />
        </motion.div>
      )}
    </div>
  );
}
