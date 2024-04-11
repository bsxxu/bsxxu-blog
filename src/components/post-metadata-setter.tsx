'use client';

import { PostMetadata } from '@/lib/mdx';
import { useSetPostMetadata } from '@/providers/post-metadata-provider';
import { useEffect } from 'react';

export default function PostMetadataSetter({
  children,
  data,
}: {
  children: React.ReactNode;
  data: PostMetadata;
}) {
  const setPostMetaData = useSetPostMetadata();
  useEffect(() => setPostMetaData(data), [data, setPostMetaData]);
  return children;
}
