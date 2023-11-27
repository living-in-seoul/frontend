import { fetchCommunity } from '@/actions/fetchCommunity';
import { categoryKO } from '@/utils/utilFunc';
import { Suspense } from 'react';
import CommunityBoardList from './CommunityBoardList';
import CommunityHotTag from './CommunityHotTag';

const CommunityBoard = async ({
  category,
  tag,
  ordertype,
}: {
  category: string;
  tag: string;
  ordertype: SelectPopType;
}) => {
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
    <>
      {TagCategory && (
        <CommunityHotTag Hottag={TagCategory} category={category} />
      )}

      <CommunityBoardList
        key={category + tag + ordertype}
        firstList={lists?.result ?? []}
        Category={category}
        tags={tag}
        totalpage={lists?.pageable.totalPages ?? 1}
        ordertype={ordertype}
      />
    </>
  );
};
export default CommunityBoard;
