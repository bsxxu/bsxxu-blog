'use client';

import type { PostMetadata } from '@/data/interfaces/post';
import { useSetBlogMetadata } from '@/providers/context-state-provider';
import { useEffect } from 'react';

export default function PostMetadataSetter({
  data,
}: {
  data: PostMetadata;
}) {
  const setPostMetaData = useSetBlogMetadata();
  useEffect(() => setPostMetaData(data), [data, setPostMetaData]);
  return null;
}
