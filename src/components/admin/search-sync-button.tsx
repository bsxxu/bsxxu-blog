'use client';

import { useToast } from '@/hooks/use-toast';
import { syncSearchEngine } from '@/service/action/post';
import { useTransition } from 'react';
import { Button } from '../ui/button';

export default function SearchSyncButton() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const onClick = () => {
    startTransition(async () => {
      const { error } = await syncSearchEngine();
      error
        ? toast({
            variant: 'destructive',
            title: error.message,
          })
        : toast({
            title: '搜索引擎同步成功',
          });
    });
  };
  return (
    <Button disabled={isPending} onClick={onClick}>
      {isPending ?? <span className="animate-spin i-ri-loader-5-fill" />}Sync
    </Button>
  );
}
