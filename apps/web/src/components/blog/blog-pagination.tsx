import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function BlogPagination({
  currentPage = 1,
  totalPage,
  pageSize = 15,
}: {
  currentPage?: number;
  totalPage: number;
  pageSize?: number;
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {Array(totalPage)
          .fill(0)
          .map((_, idx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <PaginationItem key={idx}>
              <PaginationLink
                href={`/blog?page=${idx + 1}&pageSize=${pageSize}`}
                isActive={idx + 1 === currentPage}
              >
                {idx + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
