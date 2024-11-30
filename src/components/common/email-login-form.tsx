'use client';

import useThrottleFn from '@/hooks/use-throttle-fn';
import { useToast } from '@/hooks/use-toast';
import { loginWithEmail } from '@/service/server/actions/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const formSchema = z.object({
  email: z.string().email(),
});

export default function EmailLoginForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = useThrottleFn(async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const { error } = await loginWithEmail(values.email);
      error
        ? toast({
            variant: 'destructive',
            title: error.message,
          })
        : toast({
            description: '邮件已发送，请查收',
          });
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormDescription className="pt-5">
                Please enter your email address, and we will send you a login
                guide email shortly.
              </FormDescription>
              <FormControl>
                <Input placeholder="enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" className=" w-32" disabled={isPending}>
            {isPending && <span className="i-ri-loader-4-fill animate-spin" />}
            Send
          </Button>
        </div>
      </form>
    </Form>
  );
}
