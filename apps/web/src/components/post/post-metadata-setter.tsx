'use client';

import { useSetBlogMetadata } from '@/providers/context-state-provider';
import { useEffect } from 'react';
import type { PostMetadata } from '../../../../server/src/data/interfaces/post';

export default function PostMetadataSetter({
  data,
}: {
  data: PostMetadata;
}) {
  const setPostMetaData = useSetBlogMetadata();
  useEffect(() => setPostMetaData(data), [data, setPostMetaData]);
  return null;
}
