import { getAllPost } from '@/lib/mdx';
import Link from 'next/link';

export default function AllPosts() {
  const posts = getAllPost();
  return (
    <div>
      {posts.map(p => (
        <Link href={`/blog/${p.slug}`} key={p.title}>
          <div>
            {p.title}
            {p.date}
          </div>
        </Link>
      ))}
    </div>
  );
}
