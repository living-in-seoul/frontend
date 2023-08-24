import DetialCommentItem from './DetialCommentItem';
export interface DetailCommentProps {
  data: { commentSize: number; comments: Comment[] };
}

const DetailComment = ({ data }: DetailCommentProps) => {
  return (
    <div className="py-6 px-4 flex flex-col gap-4 border-b-2">
      <span className="font-semibold">댓글 {data.commentSize}</span>

      {data.comments.map((comment, index) => (
        <DetialCommentItem
          key={comment.nickname + index}
          commentData={comment}
        />
      ))}
    </div>
  );
};

export default DetailComment;
