import { search } from '@/utils/Icon';
import Icons from '../common/Icons';
import Link from 'next/link';

const SearchModalOn = () => {
  return (
    <Link href={'/search'}>
      <div>
        <Icons
          path={search}
          fill="none"
          option={{
            stroke: 'black',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
          }}
        />
      </div>
    </Link>
  );
};
export default SearchModalOn;
