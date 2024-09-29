import BlogPagination from '@/components/blog/blog-pagination';
import PostCard from '@/components/post-card';
import { trpc } from '@/lib/trpc';

export const fetchCache = 'default-no-store';

export default async function AllPosts({
  searchParams,
}: { searchParams: { page?: string; pageSize?: string } }) {
  const { page = '1', pageSize = '3' } = searchParams;
  const res = await trpc.posts.getPosts.query({ page, pageSize });
  return (
    <>
      <div className="text-center mt-40 mb-10 text-3xl font-bold">
        共{res.totalHits}篇文章
      </div>
      <div className="mx-auto max-w-2xl flex justify-center gap-3">
        <div className="space-y-5 pb-10 w-full">
          {res.hits.map((p) => (
            <PostCard key={p.title} metadata={p as any} offset={50} delay={0} />
          ))}
        </div>
      </div>
      <BlogPagination
        currentPage={+(page ?? 1)}
        pageSize={+(pageSize ?? 3)}
        totalPage={res.totalPages}
      />
    </>
  );
}
