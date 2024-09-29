import { authRouter } from '../modules/auth/auth.router';
import { postsRouter } from '../modules/posts/posts.router';
import { router } from './trpc';

export const appRouter = router({
  posts: postsRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
