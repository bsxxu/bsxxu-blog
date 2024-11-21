import CommentBox from './comment-box';
import CommentList from './comment-list';

export default function PostComment({ postKey }: { postKey: string }) {
  return (
    <>
      <CommentBox />
      <CommentList postKey={postKey} />
    </>
  );
}
