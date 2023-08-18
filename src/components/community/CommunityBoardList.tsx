'use client';
import Loading from '@/app/loading';
import useSWR from 'swr';
import PostItem from './PostItem';

interface CommunityBoardProps {
  title?: string;
  Category?: string;
}
const CommunityBoardList = ({ Category }: CommunityBoardProps) => {
  const { data: lists, isLoading } = useSWR<ResponseRegister>(
    `/api/community/${Category}`,
  );
  console.log(lists);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <article className="flex flex-col border-b-4">
      {lists?.result.map((post) => (
        <PostItem {...post} key={post.post.postId} />
      ))}
      {/* <CategoryPostList /> */}
    </article>
  );
};
export default CommunityBoardList;
