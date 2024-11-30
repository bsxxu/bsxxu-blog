'use client';

import { useToast } from '@/hooks/use-toast';
import { uploadImages } from '@/service/server/actions/post';
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
import { Input } from '../ui/input';

const formSchema = z.object({
  images: z
    .instanceof(FileList, { message: '请选择文件' })
    .refine((files) => files.length > 0, { message: '请选择至少一张图片' })
    .refine(
      (files) =>
        Array.from(files).every((file) => file.type.startsWith('image/')),
      {
        message: '请选择图片文件',
      },
    ),
});

export default function ImageUploadForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        await uploadImages(data.images);
        form.reset();
        toast({ description: '上传成功' });
      } catch (error: any) {
        toast({
          description: error.message ?? '上传失败，请稍后再试',
          variant: 'destructive',
        });
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
          name="images"
          render={({ field: { value, ...fields } }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...fields}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={async (e) => fields.onChange(e.target.files)}
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
