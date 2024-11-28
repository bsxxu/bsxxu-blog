import type { getPost } from '@/service/server/post';

export type PostType = Awaited<ReturnType<typeof getPost>>;
