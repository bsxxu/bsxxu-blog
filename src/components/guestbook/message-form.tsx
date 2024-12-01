'use client';

import useThrottleFn from '@/hooks/use-throttle-fn';
import { useToast } from '@/hooks/use-toast';
import { leaveMessage } from '@/service/action/message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  content: z.string().min(1, { message: '留言不能为空' }).max(500, {
    message: '留言不能超过500个字符',
  }),
});

export default function MessageForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = useThrottleFn((data: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const { error } = await leaveMessage(data.content);
      error
        ? toast({ variant: 'destructive', title: error.message })
        : toast({ title: '留言成功' });
    });
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 relative"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="留言..."
                  {...field}
                  className="scrollbar-none resize-none"
                  rows={5}
                />
              </FormControl>
              <FormMessage className="absolute" />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ?? (
              <span className="i-ri-send-plane-line animate-spin" />
            )}
            <span>发送</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
