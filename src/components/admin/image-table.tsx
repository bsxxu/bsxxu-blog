'use client';

import { toast, useToast } from '@/hooks/use-toast';
import { PAGE_NUM } from '@/lib/constants';
import { deleteImage } from '@/service/action/post';
import type { Pagination } from '@/service/type/pagination';
import type { ColumnDef, Table } from '@tanstack/react-table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import ClickView from '../motion/click-view';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import DataTable from '../ui/data-table';
import PostSelector from './post-selector';

export type ImageType = {
  key: string;
  size: number;
  date: string;
};

export const ImageColumns: ColumnDef<ImageType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'key',
    header: 'Key',
  },
  {
    accessorKey: 'size',
    header: '大小',
  },
  {
    accessorKey: 'date',
    header: '日期',
  },
  {
    id: 'action',
    header: '操作',
    cell: ({ row }) => {
      const { key } = row.original;
      return (
        <div className="py-1 flex items-center gap-5 text-lg translate-y-[3px]">
          <ClickView>
            <span className="i-ri-image-2-line" />
          </ClickView>
          <ClickView
            onClick={async () => {
              const { error } = await deleteImage(key);
              error
                ? toast({
                    variant: 'destructive',
                    title: error.message,
                  })
                : toast({
                    title: '删除成功',
                  });
            }}
          >
            <span className="i-ri-delete-bin-6-line" />
          </ClickView>
          <ClickView>
            <span className="i-ri-download-2-line" />
          </ClickView>
        </div>
      );
    },
  },
];

export default function ImageTable({
  currentPage,
  columns,
}: {
  currentPage: Pagination<ImageType>;
  columns: ColumnDef<ImageType>[];
}) {
  const tableRef = useRef<Table<ImageType>>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { toast } = useToast();
  const { replace } = useRouter();

  return (
    <div className=" space-y-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <span>所属文章</span>
          <PostSelector
            onChange={(postKey) => {
              const params = new URLSearchParams(searchParams);
              params.set('postKey', postKey);
              params.set('page', String(PAGE_NUM));
              tableRef.current?.resetRowSelection();
              replace(`${pathname}?${params.toString()}`);
            }}
          />
        </div>
        <div className="space-x-5">
          <Button
            variant="destructive"
            onClick={() => {
              const rows = tableRef.current?.getSelectedRowModel().rows;
              if (!rows?.length)
                return toast({
                  title: '没有选中任何行',
                  variant: 'destructive',
                });
            }}
          >
            批量删除
          </Button>
          <Button
            onClick={() => {
              const rows = tableRef.current?.getSelectedRowModel().rows;
              if (!rows?.length)
                return toast({
                  title: '没有选中任何行',
                  variant: 'destructive',
                });
            }}
          >
            批量下载
          </Button>
          <Button>上传</Button>
        </div>
      </div>
      <DataTable<ImageType>
        currentPage={currentPage}
        columns={columns}
        ref={tableRef}
      />
    </div>
  );
}
