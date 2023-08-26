'use client';
import DetialCommentItem from './DetialCommentItem';
import useSWR, { useSWRConfig } from 'swr';

interface DetialCommentProps {
  postId: string;
  commentSize: number;
}

const DetailComment = ({ postId, commentSize }: DetialCommentProps) => {
  const {
    data: comments,
    isLoading,
    error,
  } = useSWR<Comment[]>(`/api/comment/${postId}`);
  const { mutate } = useSWRConfig();
  // mutate();

  return (
    <div className="py-6 px-4 flex flex-col gap-4 border-b-2">
      <span className="font-semibold">댓글 {commentSize}</span>
      {comments?.map((comment, index) => (
        <DetialCommentItem
          key={comment.nickname + index}
          commentData={comment}
        />
      ))}
    </div>
  );
};

export default DetailComment;
