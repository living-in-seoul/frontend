'use client';
import usePosts from '@/hooks/usePosts';
import { HomeKeyState } from '@/recoil/communityStates';
import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import PostItem from '../community/PostItem';
import Link from 'next/link';

interface CommunityBoardProps {
  title?: string;
  Category?: string;
  tags?: string | string[];
}
const HomeBoardList = ({ Category, tags }: CommunityBoardProps) => {
  const [isPop, setIsPop] = useState<SelectPopType>('newer');
  const setHomeKeyState = useSetRecoilState(HomeKeyState);

  useEffect(() => {
    setHomeKeyState(
      `/api/home/${Category}?hashtag=${tags}&category=${'newer'}`,
    );
  }, [Category, setHomeKeyState, tags]);
  const { posts: lists, isLoading } = usePosts(HomeKeyState);

  return (
    <article className="flex flex-col">
      {isLoading && <div className="w-full h-[360px]">loading...</div>}
      {lists?.result.map((post) => (
        <PostItem
          category={Category}
          tags={tags}
          isPop={isPop}
          {...post}
          key={post.post.postId}
        />
      ))}
      {/* <CategoryPostList /> */}
    </article>
  );
};
export default HomeBoardList;
