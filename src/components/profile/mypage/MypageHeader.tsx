import Icons from '@/components/common/Icons';
import { Alert } from '@/utils/Icon';

const MypageHeader = () => {
  return (
    <div className="flex flex-row justify-between items-center px-4">
      <span className="font-semibold text-base">마이페이지</span>
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

export default MypageHeader;
