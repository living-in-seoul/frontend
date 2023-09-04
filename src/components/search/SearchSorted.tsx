import Select from '../common/Select';

interface CommunityBoardProps {
  totalElements: number;
  order: SelectPopType;
}
const SearchSorted = ({
  totalElements,
  order = 'newer',
}: CommunityBoardProps) => {
  return (
    <div className="flex px-4 pt-5 pb-[5px] justify-between items-center">
      <div className="flex gap-2.5">
        <Select title="최신순" selectTag={order === 'newer'} />
        <Select title="인기순" selectTag={order === 'popular'} />
      </div>
      <div className="w-28 text-right">
        <span className="text-gray4 text-xs font-normal leading-none">
          게시물 검색결과{' '}
        </span>
        <span className="text-gray4 text-xs font-semibold leading-none">
          {totalElements}건
        </span>
      </div>
    </div>
  );
};
export default SearchSorted;
