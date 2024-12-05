'use client';

import type { Pagination } from '@/service/type/pagination';
import type { ColumnDef } from '@tanstack/react-table';
import DataTable from '../ui/data-table';

export type ImageType = {
  key: string;
  size: number;
  date: string;
};

export const ImageColumns: ColumnDef<ImageType>[] = [
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
      const payment = row.original;
      return (
        <div className="py-1 space-x-4 text-lg">
          <span className="i-ri-image-2-line cursor-pointer hover:text-blue-500 transition-colors" />
          <span className="i-ri-delete-bin-6-line cursor-pointer hover:text-red-500 transition-colors" />
          <span className="i-ri-download-2-line cursor-pointer hover:text-green-500 transition-colors" />
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
  return <DataTable<ImageType> currentPage={currentPage} columns={columns} />;
}
