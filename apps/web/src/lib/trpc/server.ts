import 'server-only';

import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../../server/src/server/router';
import { SERVER_TRPC_API } from '../env';

export const trpcServer = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: SERVER_TRPC_API,
    }),
  ],
});
