import CommunityBoardList from '@/components/community/CommunityBoardList';
import CommunityHotTag from '../CommunityHotTag';
interface CategoryPageProps {
  params: {
    category: string[] | null;
  };
}

const CommunityPage = async ({ params }: CategoryPageProps) => {
  const category = params.category ? params.category[0] : 'All';
  const tags = params.category ? params.category[1] || [] : null;
  const categoryKO = (category: string) => {
    switch (category) {
      case 'communication':
        return '동향소통';
      case 'review':
        return '후기';
      case 'Life':
        return '생활정보';
      default:
        return category;
    }
  };

  const FetchUrl =
    category === 'All' ? 'All' : `category?category=${categoryKO(category)}`;
  const TagCategory = await fetch(
    `https://seoulvival.com:8080/tags/${FetchUrl}`,
    { next: { revalidate: 2000 } },
  ).then<string[]>((res) => res.json());

  return (
    <section className="w-full max-w-2xl flex flex-col">
      {TagCategory && (
        <CommunityHotTag Hottag={TagCategory} category={category} />
      )}
      {/* <h1>{category && category}</h1> */}
      <CommunityBoardList Category={category} />
    </section>
  );
};
export default CommunityPage;
