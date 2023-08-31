import SearchModalOn from '../search/SearchModalOn';
import AlertModalOn from '../alert/AlertModalOn';

const CommunitySearch = () => {
  return (
    <div className="flex pr-3.5 items-center justify-center gap-5">
      <SearchModalOn />
      <AlertModalOn />
    </div>
  );
};
export default CommunitySearch;
