'use client';
import PostItem from '@/components/community/PostItem';
import Link from 'next/link';
import useSWR from 'swr';

interface BoardListProps {
  markerIdValue: number | null;
  boardList: ResponseRegister | null;
}

const BoardList = ({ markerIdValue, boardList }: BoardListProps) => {
  const { data } = useSWR<ResponseBoardDetail>(
    `api/map/detail/${markerIdValue}`,
  );

  return (
    <article className="flex flex-col border-b-4 ">
      <div className="w-full justify-between flex"></div>
      {markerIdValue ? (
        <>
          {data?.result && (
            <PostItem
              location={data.result.location}
              post={data.result.post}
              user={data.result.user}
              hasLiked
              onMap={true}
            />
          )}
        </>
      ) : (
        <div className="h-full overflow-y-auto ">
          {boardList?.result?.map((post) => (
            <div key={post.post.postId} className="w-full mb-0.5">
              <Link href={`/detail/${post.post.postId}`}>
                <PostItem {...post} key={post.post.postId} onMap />
              </Link>
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

export default BoardList;
