'use client';

import type { PostMetadata } from '@/lib/mdx';
import { createContextState } from 'foxact/context-state';

export const [PostMetadataProvider, usePostMetadataValue, useSetPostMetadata] =
  createContextState<PostMetadata>({
    title: '',
    date: '',
  });
