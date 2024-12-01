'use client';

import { useToast } from '@/hooks/use-toast';
import { savePost } from '@/service/action/post';
import { zodResolver } from '@hookform/resolvers/zod';
import matter from 'gray-matter';
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
import { Input } from '../ui/input';

const postDataSchema = z.object({
  content: z.string(),
  data: z.object({
    key: z.string(),
    title: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
    date: z.string().datetime(),
  }),
});

const formSchema = z.object({
  postFile: z
    .instanceof(File, { message: '文件不能为空' })
    .refine(async (file) => {
      const buffer = file.arrayBuffer();
      const text = new TextDecoder('utf-8').decode(await buffer);
      const m = matter(text);
      (file as any).postKey = m.data.key;
      return postDataSchema.safeParse(m).success;
    }, '文件内容格式错误'),
});

export default function PostUploadForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const { error } = await savePost(
        (data.postFile as any).postKey,
        data.postFile,
      );
      if (error) {
        toast({ variant: 'destructive', title: error.message });
      } else {
        form.reset();
        toast({ title: '上传成功' });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 relative"
      >
        <FormField
          control={form.control}
          name="postFile"
          render={({ field: { value, ...fields } }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...fields}
                  type="file"
                  onChange={async (e) => fields.onChange(e.target.files?.[0])}
                  className="max-w-52 mx-auto"
                />
              </FormControl>
              <FormMessage className="absolute right-16" />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button disabled={isPending} type="submit">
            {isPending && <span className="animate-spin i-ri-loader-5-fill" />}
            <span>上传</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
