'use client';

import type { PostMetadata } from '@/data/interfaces/post';
import { createContextState } from 'foxact/context-state';

//TODO 改成post
export const [BlogMetadataProvider, useBlogMetadata, useSetBlogMetadata] =
  createContextState<PostMetadata | null>(null);
