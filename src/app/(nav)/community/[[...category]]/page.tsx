import CommunityHotTag from '../CommunityHotTag';
import { categoryKO } from '@/utils/utilFunc';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Loading from '@/app/loading';

interface CategoryPageProps {
  params: {
    category: string[] | null;
  };
}
const CommunityBoardComponent = dynamic(
  () => import('@/components/community/CommunityBoardList'),
  {
    ssr: false,
    loading: () => (
      <div>
        <Loading />
      </div>
    ),
  },
);
const CommunityPage = async ({ params }: CategoryPageProps) => {
  const category = params.category ? params.category[0] : 'All';
  const tags = params.category ? params.category[1] || [] : null;

  const FetchUrl =
    category === 'All' ? 'All' : `category?category=${categoryKO(category)}`;
  const TagCategory = await fetch(
    `https://seoulvival.com:8080/tags/${FetchUrl}`,
    { next: { revalidate: 2000 } },
  ).then<string[]>((res) => res.json());

  return (
    <section className="w-full max-w-2xl flex flex-col relative">
      {TagCategory && (
        <CommunityHotTag Hottag={TagCategory} category={category} />
      )}
      {/* <h1>{category && category}</h1> */}
      <CommunityBoardComponent Category={category} tags={tags} />
      <Link
        href={'/write'}
        className="fixed bottom-20 right-0 w-12 h-12 bg-neutral-700 rounded-full"
      ></Link>
    </section>
  );
};
export default CommunityPage;
