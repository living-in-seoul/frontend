import SearchInput from '@/components/common/SearchInput';
import CommunityBoardList from '@/components/community/CommunityBoardList';
const Category = ['여행', '맛집', '꿀팁'];
const CategoryLocation = ['부산', '경남', '경북', '울산', '대구', '대전'];
const CommunityPage = () => {
  return (
    <section className="w-full max-w-2xl flex flex-col">
      <div className="w-full h-32 bg-zinc-300 items-center flex justify-center">
        <SearchInput placeholder="#해시태그로 검색해 보세요" />
      </div>
      <CommunityBoardList title="실시간 인기글" Category={Category} />
      <CommunityBoardList
        title="이웃이 남긴 후기를 살펴보세요"
        Category={Category}
        image={true}
      />
      <CommunityBoardList
        title="동향 사람들과 소통해 보세요"
        Category={CategoryLocation}
      />
    </section>
  );
};
export default CommunityPage;
