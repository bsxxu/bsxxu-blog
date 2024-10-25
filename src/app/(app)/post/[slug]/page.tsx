import Article from '@/components/post/article';
import PostMetadataSetter from '@/components/post/post-metadata-setter';
import { timeFormat } from '@/lib/utils';
import { getAllPostsKeys, getPost } from '@/service/server/post';

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const keys = await getAllPostsKeys();
  return keys.map((k) => ({
    slug: k,
  }));
}

type Params = Promise<{
  slug: string;
}>;

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const res = await getPost(slug);

  return (
    <>
      <PostMetadataSetter data={res} />
      <div className="text-center mt-32 mb-10 text-3xl font-bold">
        {res.title}
      </div>
      <div className="mb-5 flex justify-center gap-2 text-muted-foreground text-xs">
        <div className="flex items-center gap-1">
          <span className="i-ri-calendar-2-line" />
          {timeFormat(res.date, 'YYYY-MM-DD')}
        </div>
        {res.tags && res.tags.length >= 0 && (
          <div className="flex items-center gap-1">
            <span className="i-ri-hashtag" />
            {res.tags.slice(0, 3).join(', ')}
          </div>
        )}
        <div className="flex items-center gap-1">
          <span className="i-ri-time-fill" />
          <span>约{res.readingTime?.words}字</span>
          <span>需阅读{Math.ceil(res.readingTime?.minutes ?? 10)}分钟</span>
        </div>
      </div>
      <Article content={res.content} />
    </>
  );
}
