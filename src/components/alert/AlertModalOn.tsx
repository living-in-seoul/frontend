import { Alert, search } from '@/utils/Icon';
import Icons from '../common/Icons';
import Link from 'next/link';

const AlertModalOn = () => {
  return (
    <Link href={'/alert'}>
      <div>
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
    </Link>
  );
};
export default AlertModalOn;
