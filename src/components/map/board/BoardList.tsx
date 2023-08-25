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
        <div className="h-full overflow-y-auto">
          {boardList?.result.map((post) => (
            <div key={post.post.postId} className="w-full mb-0.5">
              <Link href={`/detail/${post.post.postId}`}>
                <div className=" absolute w-full h-[110px] bg-transparant overflow-scroll "></div>
              </Link>
              <PostItem {...post} key={post.post.postId} onMap />
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

export default BoardList;
