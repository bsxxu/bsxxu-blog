import MDXRemote from '@/components/mdx-rsc';
import { getPost } from '@/lib/mdx';

export default function post({ params }: { params: { slug: string } }) {
  const { content } = getPost(params.slug);
  return (
    <div>
      <MDXRemote content={content} />
    </div>
  );
}
