'use client';
import useSWR from 'swr';
import PostItem from './PostItem';
import { useState } from 'react';
import Select from '../common/Select';
import Loading from '@/app/loading';
import { useRecoilState } from 'recoil';
import { communityKeyState } from '@/recoil/communityStates';

interface CommunityBoardProps {
  title?: string;
  Category?: string;
  tags?: string | never[] | null;
}
const CommunityBoardList = ({ Category, tags }: CommunityBoardProps) => {
  const [isPop, setIsPop] = useState<SelectPopType>('newer');
  const [communityKey, setCommunityKey] = useRecoilState(communityKeyState);
  const { data: lists, isLoading } = useSWR<ResponseRegister>(
    `/api/community/${Category}/${tags}?category=${'newer'}`,

    {
      onSuccess: (data, key, config) => {
        console.log(data, key);
        setCommunityKey(key);
      },
    },
  );

  return (
    <article className="flex flex-col border-b-4">
      <div className="w-full justify-between flex px-4 py-6 ">
        <div className="flex gap-2.5">
          <Select
            title="최신순"
            onClick={() => setIsPop('newer')}
            select={isPop === 'newer'}
          />
          <Select
            title="인기순"
            onClick={() => setIsPop('popular')}
            select={isPop === 'popular'}
          />
        </div>
      </div>
      {isLoading && <Loading></Loading>}
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
export default CommunityBoardList;
