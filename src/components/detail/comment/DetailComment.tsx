'use client';
import { useEffect, useState } from 'react';
import DetailReCommentItem from './DetailReCommentItem';
import DetailCommentItem from './DetailCommentItem';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { commentKeyState, onReCommentState } from '@/recoil/commentState';
import { postIdstate } from '@/recoil/BoardStates';
import useSWR from 'swr';

const DetailComment = ({ postId }: { postId: string }) => {
  const setCommentKey = useSetRecoilState(commentKeyState);
  const onReComment = useRecoilValue(onReCommentState);
  const [list, setList] = useState<Comment[] | undefined>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setPostId = useSetRecoilState(postIdstate);
  const { data } = useSWR<ResponseCommentData>(`/api/comment/${postId}`);
  useEffect(() => {
    setCommentKey(`/api/comment/${postId}`);
    setList(data?.comments);
    setPostId(postId);
  }, [data?.comments, postId, setCommentKey, setPostId, list]);

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
      <span className="font-semibold">댓글 {data?.pageable.totalElements}</span>
      {data &&
        list?.map((data, index) => (
          <DetailCommentItem
            key={data.nickname + index}
            data={data}
            postId={postId}
          >
            {onReComment && (
              <>
                {data.reComments?.map((reComment, index) => (
                  <DetailReCommentItem
                    key={reComment.nickname + index}
                    reCommentData={reComment}
                  />
                ))}
              </>
            )}
          </DetailCommentItem>
        ))}
      <button className="border rounded-2xl" onClick={loadMoreList}>
        더 보기
      </button>
    </div>
  );
};

export default DetailComment;
