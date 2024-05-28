import Article from '@/components/article';
import PostMetadataSetter from '@/components/post-metadata-setter';
import { getPost } from '@/lib/mdx';
import { timeFormat } from '@/utils/common';
import { RiCalendar2Fill, RiHashtag, RiTimeFill } from 'react-icons/ri';

//TODO 标题下小字
export default async function Post({ params }: { params: { slug: string } }) {
	const { content, metadata } = getPost('posts', params.slug);
	return (
		<PostMetadataSetter data={metadata}>
			<div className="text-center mt-40 mb-10 text-ft-strong text-3xl font-bold">
				{metadata.title}
			</div>
			<div className="mb-5 flex justify-center gap-2 text-ft-minor text-xs">
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
