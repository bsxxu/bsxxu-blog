import 'client-only';

import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from './router';

const trpc = createTRPCReact<AppRouter>();

export default trpc;
