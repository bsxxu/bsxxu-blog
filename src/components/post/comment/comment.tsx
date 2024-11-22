import CommentBox from './comment-box';
import CommentList from './comment-list';

export default function PostComment({ postKey }: { postKey: string }) {
  return (
    <div className="mx-14">
      <CommentBox postKey={postKey} />
      <CommentList postKey={postKey} />
    </div>
  );
}
