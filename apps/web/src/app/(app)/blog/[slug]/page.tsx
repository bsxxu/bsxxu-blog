import Article from '@/components/blog/article';
import PostMetadataSetter from '@/components/post-metadata-setter';
import ProgressBar from '@/components/progress-bar';
import { getPost } from '@/lib/mdx';
import { timeFormat } from '@/lib/utils';
import { RiCalendar2Fill, RiHashtag, RiTimeFill } from 'react-icons/ri';

//TODO 标题下小字
export default async function Post({ params }: { params: { slug: string } }) {
  const { content, metadata } = await getPost('posts', params.slug);
  return (
    <PostMetadataSetter data={metadata}>
      <ProgressBar />
      <div className="text-center mt-40 mb-10 text-3xl font-bold">
        {metadata.title}
      </div>
      <div className="mb-5 flex justify-center gap-2 text-muted-foreground text-xs">
        <div className="flex items-center gap-1">
          <RiCalendar2Fill />
          {timeFormat(metadata.date, 'YYYY-MM-DD')}
        </div>
        {metadata.tags && metadata.tags.length >= 0 && (
          <div className="flex items-center gap-1">
            <RiHashtag />
            {metadata.tags.slice(0, 3).join(', ')}
          </div>
        )}
        <div className="flex items-center gap-1">
          <RiTimeFill />
          <span>约{metadata.readingTime?.words}字</span>
          <span>
            需阅读{Math.ceil(metadata.readingTime?.minutes ?? 10)}分钟
          </span>
        </div>
      </div>
      <Article content={content} />
    </PostMetadataSetter>
  );
}
