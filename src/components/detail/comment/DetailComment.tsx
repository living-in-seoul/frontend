'use client';
import { useCallback, useEffect, useState } from 'react';
import DetailReCommentItem from './DetailReCommentItem';
import DetailCommentItem from './DetailCommentItem';
import { useSetRecoilState } from 'recoil';
import { commentKeyState } from '@/recoil/commentState';
import { postIdstate } from '@/recoil/BoardStates';
import useSWR from 'swr';

const DetailComment = ({ postId }: { postId: string }) => {
  const setCommentKey = useSetRecoilState(commentKeyState);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<boolean>(false);
  const { data } = useSWR<ResponseCommentData>(`/api/comment/${postId}?page=1`);
  const [list, setList] = useState<Comment[] | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setPostId = useSetRecoilState(postIdstate);
  const loadMoreList = useCallback(async () => {
    const next = page + 1;
    if (data && next > data?.pageable?.totalPages) {
      return setLastPage(true);
    } else {
      const moreList = await fetch(`/api/comment/${postId}?page=${next}`)
        .then((response) => response.json())
        .then((data) => data.comments)
        .finally(() => setIsLoading(false));
      setPage(next);
      return setList((prev) => [...(prev?.length ? prev : []), ...moreList]);
    }
  }, [data, page, postId]);

  useEffect(() => {
    if (data && page === 1) {
      setList(data.comments);
    }
    if (data && page < data?.pageable.totalPages) {
      setLastPage(false);
    }
    setCommentKey(`/api/comment/${postId}?page=1`);
    setPostId(postId);
    return setLastPage(false);
  }, [data, page, postId, setCommentKey, setPostId]);
  return (
    <div className="py-6 px-4 flex flex-col gap-4 border-b-2">
      <span className="font-semibold">댓글 {data?.pageable.totalElements}</span>
      {data &&
        list?.map((data, index) => (
          <DetailCommentItem key={data.nickname + index} data={data}>
            {data.reComments?.map((reComment, index) => (
              <DetailReCommentItem
                key={reComment.nickname + index}
                reCommentData={reComment}
              />
            ))}
          </DetailCommentItem>
        ))}
      {lastPage ? (
        <div className="border rounded-2xl text-center">
          마지막 페이지입니다
        </div>
      ) : (
        <button
          disabled={isLoading}
          className="border rounded-2xl"
          onClick={loadMoreList}
        >
          더 보기
        </button>
      )}
    </div>
  );
};

export default DetailComment;
