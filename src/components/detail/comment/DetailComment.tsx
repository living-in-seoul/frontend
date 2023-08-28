'use client';
import DetailReCommentItem from './DetailReCommentItem';
import DetialCommentItem from './DetialCommentItem';
import useSWR, { useSWRConfig } from 'swr';

const DetailComment = ({ postId }: { postId: string }) => {
  const {
    data: comments,
    isLoading,
    error,
  } = useSWR<Comment[]>(`/api/comment/${postId}`);
  const { mutate } = useSWRConfig();
  // mutate();
  return (
    <div className="py-6 px-4 flex flex-col gap-4 border-b-2">
      <span className="font-semibold">댓글 {}</span>
      {comments?.map((comment, index) => (
        <DetialCommentItem key={comment.nickname + index} commentData={comment}>
          <>
            {comment.reComments?.map((reComment, index) => (
              <DetailReCommentItem key={index} reCommentData={reComment} />
            ))}
          </>
        </DetialCommentItem>
      ))}
    </div>
  );
};

export default DetailComment;
