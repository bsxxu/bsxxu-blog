import LoginButton from '@/components/common/login-button';
import { auth } from '@/lib/auth';
import CommentForm from './comment-form';

export default async function CommentBox() {
  const session = await auth();
  return (
    <div className="w-full h-44 border border-muted rounded-md p-3 mx-5 my-4">
      {session ? (
        <CommentForm />
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 h-full">
          <div>评论前请先登录</div>
          <LoginButton />
        </div>
      )}
    </div>
  );
}
