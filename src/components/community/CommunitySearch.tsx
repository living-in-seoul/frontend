import Icons from '@/components/common/Icons';
import { Alert, search } from '@/utils/Icon';
import SearchModalOn from '../search/SearchModalOn';

const CommunitySearch = () => {
  return (
    <div className="flex pr-3.5 items-center justify-center gap-5">
      <SearchModalOn />
      <Icons
        path={Alert}
        fill="none"
        option={{
          stroke: 'black',
          strokeWidth: '1.5',
          strokeLinecap: 'round',
        }}
      />
    </div>
  );
};
export default CommunitySearch;
