import 'server-only';

import { db } from '@/lib/db';
import { messages } from '@/lib/db/schema';

//TODO 分页result utils
export async function getMessagesByPage(page: number, pageSize: number) {
  const count = await db.$count(messages);
  const totalPages = Math.ceil(count / pageSize);
  return {
    currentPage: page,
    totalPages,
    data: await db.query.messages.findMany({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      with: {
        user: true,
      },
    }),
  };
}
