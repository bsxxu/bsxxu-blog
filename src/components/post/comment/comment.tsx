import { auth } from '@/lib/auth';
import CommentBox from './comment-box';
import CommentList from './comment-list';

export default async function PostComment({ postKey }: { postKey: string }) {
  const session = await auth();
  return (
    <div className="mx-14">
      <CommentBox type="new" postKey={postKey} isLogin={!!session} />
      <CommentList postKey={postKey} />
    </div>
  );
}
