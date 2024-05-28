import { usePostMetadataValue } from '@/providers/post-metadata-provider';
import { timeFormat } from '@/utils/common';
import { memo } from 'react';
import { BiShareAlt, BiSolidLike } from 'react-icons/bi';

function PostHeader() {
	const postMetadata = usePostMetadataValue();

	return (
		<div className="px-32 mt-3 min-h-12 flex items-center justify-between">
			<div>
				<div className="font-semibold">{postMetadata.title}</div>
				<div className="text-xs text-ft-minor">
					{timeFormat(postMetadata.date, 'YYYY-MM-DD')}
					<span className="pl-3">
						{postMetadata.tags?.slice(0, 3).join(' · ') ?? ''}
					</span>
				</div>
			</div>
			<div>
				<div className="text-xs text-ft-minor -translate-x-5">
					if you like it...
				</div>
				<div className="flex gap-3">
					<button className="flex items-center gap-1">
						like
						<BiSolidLike />
					</button>
					<button className="flex items-center gap-1">
						share
						<BiShareAlt />
					</button>
				</div>
			</div>
		</div>
	);
}

export default memo(PostHeader);
