'use client';

import trpc from '@/lib/trpc/client';
import Image from 'next/image';

export default function Img(props: React.ComponentPropsWithoutRef<'img'>) {
  const { src, ...rest } = props;
  if (!src) return <div className="text-center">图片地址为空</div>;

  const fileName = src.split('/').pop()?.split('.').shift() ?? '';
  const { data } = trpc.post.getImageUrl.useQuery({
    postKey: 'TODO',
    name: fileName,
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
