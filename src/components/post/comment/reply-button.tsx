'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import CommentBox from './comment-box';
import type { CommentType } from './type';

export default function ReplyButton({ comment }: { comment: CommentType }) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="i-ri-message-2-fill self-end invisible text-muted-foreground text-sm shrink-0 group-hover:visible hover:cursor-pointer " />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`回复${comment.user.name}`}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <CommentBox
          type="reply"
          replyToComment={comment}
          isLogin={!!session}
          afterComment={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
