import Icons from '@/components/common/Icons';
import { polygon } from '@/utils/Icon';

const HomeLocationSeclect = () => {
  return (
    <div>
      <div className="flex gap-2.5 justify-center items-center p-2.5">
        <div className="text-black text-base font-semibold leading-relaxed">
          서울시 전체
        </div>
        <div className="flex items-center justify-center">
          <Icons
            path={polygon}
            fill="none"
            option={{
              fill: '#404040',
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default HomeLocationSeclect;
