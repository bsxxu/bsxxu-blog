import 'server-only';

import clientApi from '@/service/client';
import { createTRPCRouter } from './init';

export const appRouter = createTRPCRouter(clientApi);
export type AppRouter = typeof appRouter;
