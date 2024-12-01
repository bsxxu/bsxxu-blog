'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import useThrottleFn from '@/hooks/use-throttle-fn';
import { useToast } from '@/hooks/use-toast';
import trpc from '@/lib/trpc/client';
import { queryClient } from '@/providers/trpc-provider';
import { createComment, replyComment } from '@/service/action/comment';
import type { CommentType } from '@/service/type/comment';
import { zodResolver } from '@hookform/resolvers/zod';
import { getQueryKey } from '@trpc/react-query';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  content: z
    .string()
    .min(1, {
      message: '内容不能为空',
    })
    .max(500, {
      message: '内容不能超过500个字符',
    }),
});

type NewCommentFormProps = {
  type: 'new';
  postKey: string;
  afterComment?: () => void;
};

type ReplyCommentFormProps = {
  type: 'reply';
  replyToComment: CommentType;
  afterComment?: () => void;
};

export type CommentFormProps = NewCommentFormProps | ReplyCommentFormProps;

//TODO update shadcn
export default function CommentForm(props: CommentFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const onSubmit = useThrottleFn(
    async (data: z.infer<typeof formSchema>) => {
      startTransition(async () => {
        try {
          props.type === 'reply'
            ? await replyComment(props.replyToComment.id, data.content)
            : await createComment(props.postKey, data.content);
          props.type === 'reply'
            ? await queryClient.invalidateQueries({
                queryKey: getQueryKey(trpc.comment.getReplyByPage, {
                  rootCommentId:
                    props.replyToComment.rootCommentId ??
                    props.replyToComment.id,
                }),
              })
            : await queryClient.invalidateQueries({
                queryKey: getQueryKey(trpc.comment.getRootCommentsByPage, {
                  postKey: props.postKey,
                }),
              });
          form.reset();
          props.afterComment?.();
          toast({
            description: '评论成功',
          });
        } catch (e: any) {
          toast({
            variant: 'destructive',
            title: '评论失败，请刷新或稍后再试',
          });
        }
      });
    },
    1000,
    [toast],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="告诉我你的想法..."
                  className="resize-none w-full h-28 scrollbar-none focus-visible:ring-0 border-none"
                  maxLength={500}
                  minLength={1}
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute" />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending && <span className="animate-spin i-ri-loader-5-fill" />}
            <span>发送</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
