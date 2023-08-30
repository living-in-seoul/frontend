'use client';
import { useEffect } from 'react';
import DetailReCommentItem from './DetailReCommentItem';
import DetialCommentItem from './DetialCommentItem';
import useSWR from 'swr';
import { useSetRecoilState } from 'recoil';
import { commentKeyState } from '@/recoil/commentState';

const DetailComment = ({
  postId,
  nickname,
}: {
  postId: string;
  nickname: string;
}) => {
  const setCommentKey = useSetRecoilState(commentKeyState);
  const {
    data: comments,
    isLoading,
    error,
  } = useSWR<Comment[]>(`/api/comment/${postId}`);
  const { data: userNickname } = useSWR<string>(`/api/profile/`);
  useEffect(() => {
    setCommentKey(`/api/comment/${postId}`);
  }, []);
  return (
    <div className="py-6 px-4 flex flex-col gap-4 border-b-2">
      <span className="font-semibold">댓글 {}</span>
      {comments?.map((comment, index) => (
        <DetialCommentItem
          key={comment.nickname + index}
          commentData={comment}
          userNickname={userNickname}
          postId={postId}
        >
          <>
            {comment.reComments?.map((reComment, index) => (
              <DetailReCommentItem
                key={index}
                reCommentData={reComment}
                userNickname={userNickname}
              />
            ))}
          </>
        </DetialCommentItem>
      ))}
    </div>
  );
};

export default DetailComment;
