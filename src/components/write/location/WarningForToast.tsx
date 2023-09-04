import Icons from '@/components/common/Icons';
import { warning } from '@/utils/Icon';

const WarningForToast = () => {
  return (
    <div className="px-2 py-2 bg-lightestMint rounded-full">
      <Icons
        path={warning}
        option={{
          stroke: '#2DDAB0',
          strokeWidth: '7',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
      />
    </div>
  );
};
export default WarningForToast;
