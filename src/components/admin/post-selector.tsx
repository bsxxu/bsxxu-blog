'use client';

import { useToast } from '@/hooks/use-toast';
import trpc from '@/lib/trpc/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export default function PostSelector({
  onChange,
}: { onChange: (value: string) => void }) {
  const { data, error } = trpc.post.getAllPostsKeys.useQuery();
  const { toast } = useToast();
  if (error)
    toast({
      variant: 'destructive',
      title: '获取文章列表失败',
    });

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="请选择文章" />
      </SelectTrigger>
      <SelectContent>
        {data?.map((key) => (
          <SelectItem key={key} value={key}>
            {key}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
