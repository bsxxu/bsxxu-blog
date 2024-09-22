'use client';

import type { PostMetadata } from '@/lib/mdx';
import { createContextState } from 'foxact/context-state';

export const [BlogMetadataProvider, useBlogMetadata, useSetBlogMetadata] =
  createContextState<PostMetadata>({
    title: '',
    date: '',
  });

export const [PaschalProvider, usePaschal, useSetPaschal] =
  createContextState('null');
