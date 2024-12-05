'use client';

import { PAGE_NUM, PAGE_SIZE } from '@/lib/constants';
import type { Pagination } from '@/service/type/pagination';
import {
  type ColumnDef,
  type PaginationState,
  type Table as ReactTable,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  type ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { Button } from './button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

type DataTableProps<TData> = {
  currentPage: Pagination<TData>;
  columns: ColumnDef<TData>[];
};

function DataTable<TData>(
  { currentPage, columns }: DataTableProps<TData>,
  ref?: ForwardedRef<ReactTable<TData>>,
) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [rowSelection, setRowSelection] = useState({});

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: searchParams.get('page')
      ? Number(searchParams.get('page'))
      : PAGE_NUM,
    pageSize: searchParams.get('pageSize')
      ? Number(searchParams.get('pageSize'))
      : PAGE_SIZE,
  });

  const table = useReactTable({
    data: currentPage.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: (update) => {
      const params = new URLSearchParams(searchParams);
      setPagination((old) => {
        const newValue = typeof update === 'function' ? update(old) : update;
        params.set('page', newValue.pageIndex.toString());
        params.set('pageSize', newValue.pageSize.toString());
        return newValue;
      });
      replace(`${pathname}?${params.toString()}`);
    },
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    state: {
      pagination,
      rowSelection,
    },
  });

  useImperativeHandle(ref, () => table, [table]);

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.previousPage();
            table.resetRowSelection();
          }}
          disabled={pagination.pageIndex <= 1}
        >
          上一页
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.nextPage();
            table.resetRowSelection();
          }}
          disabled={!currentPage.next}
        >
          下一页
        </Button>
      </div>
    </div>
  );
}

export default forwardRef(DataTable) as <TData>(
  props: DataTableProps<TData> & { ref?: ForwardedRef<ReactTable<TData>> },
) => ReturnType<typeof DataTable>;
