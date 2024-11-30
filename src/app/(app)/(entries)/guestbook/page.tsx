import MessageBox from '@/components/guestbook/message-box';
import MessageItem from '@/components/guestbook/message-item';
import Pagination from '@/components/guestbook/pagination';
import RightToLeftView from '@/components/motion/right-to-left-view';
import { Button } from '@/components/ui/button';
import { getMessagesByPage } from '@/service/server/message';
import Link from 'next/link';
import { z } from 'zod';

const PageSchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  pageSize: z.coerce.number().int().positive().optional(),
});

//TODO 排序
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = PageSchema.safeParse(await searchParams);

  if (!params.success) {
    return (
      <div className="text-muted-foreground absolute-center flex flex-col gap-5 items-center">
        <div>查询参数错误</div>
        <Link href="/guestbook">
          <Button>返回留言板</Button>
        </Link>
      </div>
    );
  }

  const {
    data: messages,
    currentPage,
    totalPages,
  } = await getMessagesByPage(
    params.data.page ?? 1,
    params.data.pageSize ?? 15,
  );

  if (totalPages > 0 && currentPage > totalPages) {
    return (
      <div className="text-muted-foreground absolute-center flex flex-col gap-5 items-center">
        <div>这一页没有留言</div>
        <Link href="/guestbook">
          <Button>返回留言板</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <RightToLeftView className="mt-24 ">
        <div className="text-right text-4xl font-bold pr-10 text-muted-foreground">
          <div>Guestbook</div>
          <div className="text-base text-muted-foreground/50 font-normal">
            Welcome to leave a message.
          </div>
        </div>
      </RightToLeftView>
      <div className="mx-auto mt-14 columns-4 gap-5 space-y-3">
        {messages.map((m) => (
          <MessageItem key={m.id} data={m} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPage={totalPages} />
      <MessageBox />
    </>
  );
}
