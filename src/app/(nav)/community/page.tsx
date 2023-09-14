import { v4 as uuidv4 } from 'uuid';
import { categoryKO } from '@/utils/utilFunc';
import CommunityBoardList from '@/components/community/CommunityBoardList';
import { fetchCommunity } from '@/actions/fetchCommunity';
import CommunityHotTag from '@/components/community/CommunityHotTag';
import WriteButton from '@/components/map/actions/WriteButton';

export const revalidate = 0;
interface PageProps {
  searchParams: { [key: string]: string | undefined };
}
const CommunityPage = async ({ searchParams }: PageProps) => {
  const category = searchParams.category ? searchParams.category : 'All';
  const tags = searchParams.tag ? searchParams.tag || [] : null;
  const ordertype = (searchParams.ordertype || 'newer') as SelectPopType;

  const FetchUrl =
    category === 'All' ? 'category=' : `category=${categoryKO(category)}`;
  const FETCH_API = `${process.env.NEXT_PUBLIC_SERVER}/tags/rank?${FetchUrl}`;
  const TagCategory = await fetch(FETCH_API, {
    next: { revalidate: 2000 },
  }).then<string[]>((res) => res.json());

  const lists = await fetchCommunity({
    page: 1,
    limit: 10,
    category,
    ordertype,
    tags,
  }).then((res) => res);

  return (
    <section className="w-full max-w-md flex flex-col relative" key={uuidv4()}>
      {TagCategory && (
        <CommunityHotTag Hottag={TagCategory} category={category} />
      )}
      <CommunityBoardList
        firstList={lists?.result ?? []}
        Category={category}
        tags={tags}
        totalpage={lists?.pageable.totalPages ?? 1}
        ordertype={ordertype}
      />

      <WriteButton section="home" />
    </section>
  );
};
export default CommunityPage;
