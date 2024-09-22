import { db } from '@/lib/db';
import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

export function createContext({ req, res }: CreateFastifyContextOptions) {
  return { req, res, db };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
