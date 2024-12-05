import ImageTable, {
  ImageColumns,
  type ImageType,
} from '@/components/admin/image-table';
import PostSelector from '@/components/admin/post-selector';
import { Button } from '@/components/ui/button';
import { PAGE_NUM, PAGE_SIZE } from '@/lib/constants';
import { getImagesByPage } from '@/service/common/post';
import Link from 'next/link';
import { z } from 'zod';

const PageSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(PAGE_NUM),
  pageSize: z.coerce.number().int().positive().optional().default(PAGE_SIZE),
  postKey: z.string().optional(),
});

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
        <Link href="/admin/image">
          <Button>返回</Button>
        </Link>
      </div>
    );
  }

  const { result, error } = await getImagesByPage(
    params.data.page,
    params.data.pageSize,
  );

  if (error) throw new Error(error.message);

  const list: ImageType[] = (result.data.Contents ?? []).map((c) => ({
    key: c.Key ?? 'unknown',
    date: c.LastModified?.toISOString() ?? 'unknown',
    size: c.Size ?? 0,
  }));

  return (
    <div className="space-y-5 py-10">
      <div className="text-2xl font-bold">图片管理</div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <span>所属文章</span>
          <PostSelector />
        </div>
        <div className="space-x-5">
          <Button variant="destructive">批量删除</Button>
          <Button>批量下载</Button>
          <Button>上传</Button>
        </div>
      </div>
      <ImageTable
        currentPage={{ data: list, next: result.next }}
        columns={ImageColumns}
      />
    </div>
  );
}
