'use client';

import trpc from '@/lib/trpc/client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

export default function Img(props: React.ComponentPropsWithoutRef<'img'>) {
  const { src, ...rest } = props;
  if (!src) return <div className="text-center">图片地址为空</div>;

  const fileName = src.split('/').pop()?.split('.').shift() ?? '';

  const { data } = useQuery({
    queryKey: ['image', fileName],
    queryFn: () => trpc.post.getImageUrl.query(fileName),
  });

  return (
    <>
      {data && (
        <Image
          src={data ?? ''}
          {...rest}
          alt="test"
          width={500}
          height={500}
          className="w-full"
        />
      )}
    </>
  );
}
