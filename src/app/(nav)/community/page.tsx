import { v4 as uuidv4 } from 'uuid';
import { categoryKO } from '@/utils/utilFunc';
import { fetchCommunity } from '@/actions/fetchCommunity';
import CommunityHotTag from '@/components/community/CommunityHotTag';
import WriteButton from '@/components/map/actions/WriteButton';
import CommunityBoardList from '@/components/community/CommunityBoardList';
import { exampleData } from '@/utils/constants/mock.test';
import { Suspense } from 'react';
import CommunityBoard from '@/components/community/CommunityBoard';
import Loading from './loading';

export const dynamic = 'force-dynamic';
export interface SearchParams {
  category?: string;
  tag?: string;
  ordertype?: SelectPopType;
  [key: string]: string | undefined;
}

interface PageProps {
  searchParams: SearchParams;
}

const CommunityPage = async ({ searchParams }: PageProps) => {
  const { category = 'All', tag, ordertype = 'newer' } = searchParams;

  return (
    <section className="w-full max-w-md flex flex-col relative">
      <Suspense fallback={<Loading />} key={category}>
        <CommunityBoard category={category} tag={tag} ordertype={ordertype} />
      </Suspense>

      <WriteButton section="home" />
    </section>
  );
};
export default CommunityPage;
