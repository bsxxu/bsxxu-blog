import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function Pagination({
  currentPage,
  totalPage,
}: { currentPage: number; totalPage: number }) {
  if (totalPage <= 1) return null;
  return (
    <div className="flex gap-2 items-center justify-around my-10">
      <Link
        href={`/guestbook?page=${currentPage - 1}`}
        className={cn({ 'pointer-events-none': currentPage === 1 })}
      >
        <Button disabled={currentPage === 1} variant="outline">
          <span className="i-ri-arrow-left-s-line" />
          Previous
        </Button>
      </Link>
      <span>{`${currentPage}/${totalPage}`}</span>
      <Link
        href={`/guestbook?page=${currentPage + 1}`}
        className={cn({ 'pointer-events-none': currentPage === totalPage })}
      >
        <Button disabled={currentPage === totalPage} variant="outline">
          Next
          <span className="i-ri-arrow-right-s-line" />
        </Button>
      </Link>
    </div>
  );
}
