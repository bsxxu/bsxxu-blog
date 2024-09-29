import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../server/src/server/router';

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: process.env.SERVER_TRPC_API ?? 'http://localhost:8080/trpc',
    }),
  ],
});
