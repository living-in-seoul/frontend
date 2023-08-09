import SearchInput from '@/components/common/SearchInput';
import CommunityBoardList from '@/components/community/CommunityBoardList';

const CommunityPage = () => {
  return (
    <section className="w-full max-w-2xl flex flex-col">
      <div className="w-full h-32 bg-zinc-300 items-center flex justify-center">
        <SearchInput placeholde="#해시태그로 검색해 보세요" />
      </div>
      <CommunityBoardList title="실시간 인기글" />
    </section>
  );
};
export default CommunityPage;
