import Article from '@/components/blog/article';
import PostMetadataSetter from '@/components/post-metadata-setter';
import ProgressBar from '@/components/progress-bar';
import { trpc } from '@/lib/trpc';
import { timeFormat } from '@/lib/utils';
import { RiCalendar2Fill, RiHashtag, RiTimeFill } from 'react-icons/ri';

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const keys = await trpc.posts.getAllPostsKey.query();
  return keys.map((k) => ({
    slug: k,
  }));
}

//TODO 标题下小字
export default async function Post({ params }: { params: { slug: string } }) {
  const res = await trpc.posts.getPostByKey.query(params.slug);
  return (
    <PostMetadataSetter data={res}>
      <ProgressBar />
      <div className="text-center mt-40 mb-10 text-3xl font-bold">
        {res.title}
      </div>
      <div className="mb-5 flex justify-center gap-2 text-muted-foreground text-xs">
        <div className="flex items-center gap-1">
          <RiCalendar2Fill />
          {timeFormat(res.date, 'YYYY-MM-DD')}
        </div>
        {res.tags && res.tags.length >= 0 && (
          <div className="flex items-center gap-1">
            <RiHashtag />
            {res.tags.slice(0, 3).join(', ')}
          </div>
        )}
        <div className="flex items-center gap-1">
          <RiTimeFill />
          <span>约{res.readingTime?.words}字</span>
          <span>需阅读{Math.ceil(res.readingTime?.minutes ?? 10)}分钟</span>
        </div>
      </div>
      <Article content={res.content} />
    </PostMetadataSetter>
  );
}
