'use client';
import PostItem from '@/components/community/PostItem';
import { boardListState, markerIdState } from '@/recoil/mapStates';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';

const BoardList = () => {
  const boardList = useRecoilValue(boardListState);
  const markerIdValue = useRecoilValue(markerIdState);

  return (
    <article className="flex flex-col border-b-4">
      <div className="w-full justify-between flex"></div>
      {markerIdValue ? (
        //상세 게시물 조회 api 만들기!
        <div>{markerIdValue}</div>
      ) : (
        <div>
          {boardList?.result.map((post) => (
            <Link href={`/detail/${post.post.postId}`} key={post.post.postId}>
              <PostItem {...post} key={post.post.postId} onMap />
            </Link>
          ))}
        </div>
      )}
    </article>
  );
};

export default BoardList;
