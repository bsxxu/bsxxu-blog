'use client';

import { useToast } from '@/hooks/use-toast';
import { uploadImage } from '@/service/action/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';
import PostSelector from './post-selector';

const formSchema = z.object({
  postKey: z.string({ message: '请选择文章' }),
  images: z
    .array(z.instanceof(File), { message: '请选择文件' })
    .nonempty({ message: '请选择至少一张图片' })
    .refine((files) => files.every((file) => file.type.startsWith('image/')), {
      message: '请选择图片文件',
    }),
});

const ImageToUpload = ({
  file,
  waitPromise,
}: { file: File; waitPromise?: ReturnType<typeof uploadImage> }) => {
  const url = useMemo(() => URL.createObjectURL(file), [file]);
  const [status, setStatus] = useState<
    'pending' | 'success' | 'error' | 'wait'
  >('wait');

  useEffect(() => {
    if (!waitPromise) return;
    setStatus('pending');
    waitPromise
      .then((e) => (e.error ? setStatus('error') : setStatus('success')))
      .finally(() => URL.revokeObjectURL(url));
  }, [url, waitPromise]);
  console.log(status);

  return (
    <div className="relative w-32">
      <img className="w-full rounded-lg" src={url} alt={file.name} />
      {status === 'pending' && (
        <>
          <Skeleton className="absolute top-0 z-10 w-full h-32 bg-muted/70" />
          <div className="flex items-center justify-center absolute w-full h-full top-0 z-20">
            <span className="animate-spin i-ri-loader-5-fill z-50" />
          </div>
        </>
      )}
      {status === 'success' && (
        <span className="absolute text-[50px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-500 i-ri-checkbox-circle-fill" />
      )}
      {status === 'error' && (
        <span className="absolute text-[50px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 i-ri-close-circle-fill" />
      )}
    </div>
  );
};

export default function ImageUploadForm() {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [waitPromises, setWaitPromises] = useState<
    ReturnType<typeof uploadImage>[]
  >([]);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      if (waitPromises.length) {
        toast({
          title: '上传中',
        });
        return;
      }
      const promises = data.images.map((image) =>
        uploadImage(data.postKey, image),
      );
      setWaitPromises(promises);
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-10 relative"
      >
        <FormField
          control={form.control}
          name="postKey"
          render={({ field }) => (
            <FormItem className="flex items-center justify-center gap-10">
              <FormLabel>所属文章</FormLabel>
              <PostSelector onChange={field.onChange} />
              <FormMessage className="absolute right-16" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field: { value, ...fields } }) => (
            <FormItem className="flex items-center justify-center gap-10">
              <FormLabel>选择图片</FormLabel>
              <FormControl>
                <Input
                  {...fields}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={async (e) => {
                    const files = Array.from(e.target.files ?? []);
                    setFiles(files);
                    fields.onChange(files);
                  }}
                  className="max-w-52"
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
        <div className="flex gap-5 justify-center flex-wrap">
          {files.map((f, idx) => (
            <ImageToUpload
              key={f.name}
              file={f}
              waitPromise={waitPromises[idx]}
            />
          ))}
        </div>
      </form>
    </Form>
  );
}
