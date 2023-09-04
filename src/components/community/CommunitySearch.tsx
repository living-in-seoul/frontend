import SearchModalOn from '../search/SearchModalOn';
import AlertButtonComponent from '../home/AlertButtonComponent';

const CommunitySearch = () => {
  return (
    <div className="flex pr-3.5 items-center justify-center gap-5">
      <SearchModalOn />
      <AlertButtonComponent link="alert" type="community" />
    </div>
  );
};
export default CommunitySearch;
