'use client';
import { useEffect, useState } from 'react';
import DetailReCommentItem from './DetailReCommentItem';
import DetialCommentItem from './DetialCommentItem';
import useSWR from 'swr';
import { useSetRecoilState } from 'recoil';
import { commentKeyState } from '@/recoil/commentState';

const DetailComment = () => {
  const setCommentKey = useSetRecoilState(commentKeyState);
  const [list, setList] = useState<Comment[] | undefined>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userNickname = localStorage.getItem('nickname');
  const postId = localStorage.getItem('postId');
  const { data: comments } = useSWR<Comment[]>(`/api/comment/${postId}`);

  useEffect(() => {
    setCommentKey(`/api/comment/${postId}`);
    setList(comments);
  }, [comments, postId, setCommentKey]);
  const loadMoreList = async () => {
    const next = page + 1;
    const moreList = await fetch(`/api/comment/${postId}?page=${next}`)
      .then((response) => response.json())
      .finally(() => setIsLoading(false));
    setPage(next);
    setList((prev) => [...(prev?.length ? prev : []), ...moreList]);
  };
  return (
    <div className="py-6 px-4 flex flex-col gap-4 border-b-2">
      <span className="font-semibold">댓글 {}</span>
      {list?.map((data, index) => (
        <DetialCommentItem
          key={data.nickname + index}
          data={data}
          userNickname={userNickname ?? ''}
        >
          <>
            {data.reComments?.map((reComment, index) => (
              <DetailReCommentItem
                key={index}
                reCommentData={reComment}
                userNickname={userNickname ?? ''}
              />
            ))}
          </>
        </DetialCommentItem>
      ))}
      <button className="border rounded-2xl" onClick={loadMoreList}>
        더 보기
      </button>
    </div>
  );
};

export default DetailComment;
