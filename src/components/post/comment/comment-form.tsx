'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';

export default function CommentForm() {
  const form = useForm<{ comment: string }>();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => console.log(data))}>
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="告诉我你的想法..."
                  className="resize-none w-full h-28 scrollbar-none focus-visible:ring-0 border-none"
                  maxLength={500}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">发送</Button>
        </div>
      </form>
    </Form>
  );
}
