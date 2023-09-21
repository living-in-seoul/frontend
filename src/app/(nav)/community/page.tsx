import { v4 as uuidv4 } from 'uuid';
import { categoryKO } from '@/utils/utilFunc';
import { fetchCommunity } from '@/actions/fetchCommunity';
import CommunityHotTag from '@/components/community/CommunityHotTag';
import WriteButton from '@/components/map/actions/WriteButton';
import CommunityBoardList from '@/components/community/CommunityBoardList';

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

  const FetchUrl =
    category === 'All' ? 'category=' : `category=${categoryKO(category)}`;
  const FETCH_API = `${process.env.NEXT_PUBLIC_SERVER}/tags/rank?${FetchUrl}`;

  const tagCategoryPromise = fetch(FETCH_API, {
    next: { revalidate: 2000 },
  }).then<string[]>((res) => {
    if (!res.ok) throw new Error('태그 카테고리가 없음');
    return res.json();
  });

  const listsPromise = fetchCommunity({
    page: 1,
    limit: 10,
    category,
    ordertype: ordertype,
    tags: tag,
  });

  const [TagCategory, lists] = await Promise.all([
    tagCategoryPromise,
    listsPromise,
  ]);

  return (
    <section className="w-full max-w-md flex flex-col relative" key={uuidv4()}>
      {TagCategory && (
        <CommunityHotTag Hottag={TagCategory} category={category} />
      )}
      <CommunityBoardList
        firstList={lists?.result ?? []}
        Category={category}
        tags={tag}
        totalpage={lists?.pageable.totalPages ?? 1}
        ordertype={ordertype}
      />

      <WriteButton section="home" />
    </section>
  );
};
export default CommunityPage;
