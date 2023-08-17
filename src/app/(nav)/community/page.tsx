import SearchInput from '@/components/common/SearchInput';
import CommunityBoardList from '@/components/community/CommunityBoardList';

const CommunityPage = async () => {
  const locationTagCategory = await fetch(
    'https://seoulvival.com:8080/tags/locationTags',
  ).then((res) => res.json());
  const purposeTagCategory = await fetch(
    'https://seoulvival.com:8080/tags/purposeTags',
  ).then((res) => res.json());

  console.log(locationTagCategory);
  return (
    <section className="w-full max-w-2xl flex flex-col">
      <div className="w-full h-32 bg-zinc-300 items-center flex justify-center">
        <SearchInput placeholder="#해시태그로 검색해 보세요" />
      </div>
      <CommunityBoardList
        title="실시간 인기글"
        Category={purposeTagCategory}
        type={'purpose'}
      />
      <CommunityBoardList
        title="이웃이 남긴 후기를 살펴보세요"
        Category={purposeTagCategory}
        image={true}
        type={'purpose'}
      />
      <CommunityBoardList
        title="동향 사람들과 소통해 보세요"
        Category={locationTagCategory}
        type={'location'}
      />
    </section>
  );
};
export default CommunityPage;
