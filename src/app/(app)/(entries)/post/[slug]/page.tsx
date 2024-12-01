import Article from '@/components/post/article';
import PostComment from '@/components/post/comment/comment';
import PostHeader from '@/components/post/post-header';
import ProgressBar from '@/components/post/progress-bar';
import { timeFormat } from '@/lib/utils';
import { getAllPostsKeys, getPost } from '@/service/common/post';
import { ErrorCode } from '@/service/error';
import { notFound } from 'next/navigation';

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const { error, result: keys } = await getAllPostsKeys();
  if (error) throw new Error(error.message);

  return keys.map((k) => ({
    slug: k,
  }));
}

type Params = Promise<{
  slug: string;
}>;

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const { error, result } = await getPost(slug);
  if (error?.code === ErrorCode.NotFound) notFound();
  if (error) throw new Error(error.message);

  return (
    <>
      <ProgressBar />
      <PostHeader postMetadata={result} />
      <div className="text-center mt-32 mb-10 text-3xl font-bold">
        {result.title}
      </div>
      <div className="mb-5 flex justify-center gap-2 text-muted-foreground text-xs">
        <div className="flex items-center gap-1">
          <span className="i-ri-calendar-2-line" />
          {timeFormat(result.date, 'YYYY-MM-DD')}
        </div>
        {result.tags && result.tags.length >= 0 && (
          <div className="flex items-center gap-1">
            <span className="i-ri-hashtag" />
            {result.tags.slice(0, 3).join(', ')}
          </div>
        )}
        <div className="flex items-center gap-1">
          <span className="i-ri-time-fill" />
          <span>约{result.readingTime?.words}字</span>
          <span>需阅读{Math.ceil(result.readingTime?.minutes ?? 10)}分钟</span>
        </div>
      </div>
      <Article content={result.content} />
      <PostComment postKey={result.key} />
    </>
  );
}
