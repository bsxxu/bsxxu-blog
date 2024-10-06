'use client';

import { createContextState } from 'foxact/context-state';
import type { PostMetadata } from '../../../server/src/data/interfaces/post';

export const [BlogMetadataProvider, useBlogMetadata, useSetBlogMetadata] =
  createContextState<PostMetadata | null>(null);

export const [PaschalProvider, usePaschal, useSetPaschal] =
  createContextState('null');
