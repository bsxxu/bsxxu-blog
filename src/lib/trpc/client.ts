import 'client-only';

import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './router';

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: '/api/trpc',
    }),
  ],
});

export default trpc;
