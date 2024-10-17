import { timeFormat } from '@/lib/utils';
import { useBlogMetadata } from '@/providers/context-state-provider';
import { memo } from 'react';

function PostHeader() {
  const postMetadata = useBlogMetadata();

  return (
    <div className="px-32 mt-3 min-h-12 flex items-center justify-between">
      <div>
        <div className="font-semibold">{postMetadata?.title}</div>
        <div className="text-xs text-muted-foreground">
          {timeFormat(postMetadata?.date ?? '', 'YYYY-MM-DD')}
          <span className="pl-3">
            {postMetadata?.tags?.slice(0, 3).join(' · ') ?? ''}
          </span>
        </div>
      </div>
      <div>
        <div className="text-xs text-muted-foreground -translate-x-5">
          if you like it...
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-1">
            like
            <span className="i-ri-heart-fill" />
          </button>
          <button className="flex items-center gap-1">
            share
            <span className="i-ri-share-line" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(PostHeader);
