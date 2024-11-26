import LoginButton from '@/components/common/login-button';
import CommentForm, { type CommentFormProps } from './comment-form';

type CommentBoxProps = CommentFormProps & {
  isLogin?: boolean;
};

export default function CommentBox(props: CommentBoxProps) {
  const { isLogin = false, ...formProps } = props;
  return (
    <div className="w-full h-44 border border-muted rounded-md p-3 my-4">
      {isLogin ? (
        <CommentForm {...formProps} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 h-full">
          <div>评论前请先登录</div>
          <LoginButton />
        </div>
      )}
    </div>
  );
}
