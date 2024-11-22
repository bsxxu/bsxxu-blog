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
import { useToast } from '@/hooks/use-toast';
import { useThrottle } from '@/lib/utils';
import { queryClient } from '@/providers/react-query-provider';
import { createComment } from '@/service/server/actions/comment';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
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

export default function CommentForm({ postKey }: { postKey: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const onSubmit = useThrottle(
    async (data: z.infer<typeof formSchema>) => {
      try {
        setProcessing(true);
        await createComment(postKey, data.content);
        queryClient.invalidateQueries({
          queryKey: ['comments', postKey],
        });
        form.reset();
        toast({
          description: '评论成功',
        });
      } catch (e: any) {
        toast({
          variant: 'destructive',
          title: '评论失败，请刷新或稍后再试',
        });
      } finally {
        setProcessing(false);
      }
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
          <Button type="submit" disabled={processing}>
            {processing && <span className="animate-spin i-ri-loader-5-fill" />}
            <span>发送</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
