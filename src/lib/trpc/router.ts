import 'server-only';

import api from '@/service/trpc';
import type { inferRouterOutputs } from '@trpc/server';
import { createTRPCRouter } from './init';

export const appRouter = createTRPCRouter(api);
export type AppRouter = typeof appRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
