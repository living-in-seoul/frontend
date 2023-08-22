import PostItem from '@/components/community/PostItem';
import Link from 'next/link';

interface BoardListProps {
  markerIdValue: number | null;
  boardList: ResponseRegister | null;
}

const BoardList = ({ markerIdValue, boardList }: BoardListProps) => {
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
