import DefaultAvatar from '@/assets/default-avatar.png';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import Image from 'next/image';
import ReplyButton from './reply-button';
import type { CommentType, ReplyType } from './type';

type RootCommentProps = {
  type: 'root';
  comment: CommentType;
  className?: string;
};

type ReplyCommentProps = {
  type: 'reply';
  comment: ReplyType;
  className?: string;
};

type CommentProps = RootCommentProps | ReplyCommentProps;

export function CommentItem({ comment, type, className }: CommentProps) {
  return (
    <div
      key={comment.id}
      className={cn('flex items-start gap-3 group', className)}
    >
      <Image
        src={comment.user.image ?? DefaultAvatar}
        alt="avatar"
        width={30}
        height={30}
        className="rounded-full"
      />
      <div className="text-sm overflow-auto space-y-2">
        <div className="gap-3 flex items-center">
          <span>{comment.user.name}</span>
          <span className="text-muted-foreground text-xs">
            {dayjs(comment.createdAt)
              .utcOffset(8)
              .format('YYYY-MM-DD HH:mm:ss CST')}
          </span>
          {type === 'reply' && (
            <span className="text-muted-foreground text-xs flex items-center">
              <span>回复&nbsp;</span>
              <span>{comment.replyToComment?.user.name}:&nbsp;</span>
              <p className=" truncate max-w-52  no-wrap inline-block">
                {comment.replyToComment?.content}
              </p>
            </span>
          )}
        </div>
        <div className="flex gap-4">
          <div className="break-words bg-muted/70 rounded-r-lg rounded-bl-lg p-2 px-3 w-fit">
            {comment.content}
          </div>
          <ReplyButton comment={comment} />
        </div>
      </div>
    </div>
  );
}
