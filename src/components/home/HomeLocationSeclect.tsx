'use client';

import Icons from '@/components/common/Icons';
import { locationBottomSheetState } from '@/recoil/bottomsheet';
import { polygon } from '@/utils/Icon';
import { useRecoilState } from 'recoil';
import BottomSheet from '../BottomSheet';
import LocationSelect from './location/LocationSelect';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

interface HomeLocationSeclectProps {
  onCommunity?: boolean;
}

const DynamicLocationSelect = dynamic(
  () => import('./location/LocationSelect'),
  {
    ssr: false,
  },
);
const HomeLocationSeclect = ({
  onCommunity = false,
}: HomeLocationSeclectProps) => {
  const [isBottomSheetOpen, setisBottomSheetState] = useRecoilState(
    locationBottomSheetState,
  );
  const pathname = usePathname();
  return (
    <>
      <div
        className="flex gap-2.5 items-center p-2.5 hover:cursor-pointer w-full "
        onClick={() => setisBottomSheetState(true)}
      >
        <div
          className={`${
            pathname === '/home' ? 'text-white' : 'text-black'
          } text-base font-semibold leading-relaxed`}
        >
          서울시 전체
        </div>
        <div className="flex items-center justify-center">
          <Icons
            path={polygon}
            fill="none"
            option={{
              fill: `${onCommunity ? 'black' : 'white'}`,
            }}
          />
        </div>
      </div>
      <BottomSheet state={locationBottomSheetState}>
        <DynamicLocationSelect />
      </BottomSheet>
    </>
  );
};
export default HomeLocationSeclect;
