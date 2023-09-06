'use client';

import Icons from '@/components/common/Icons';
import { bottomSheetState } from '@/recoil/bottomsheet';
import { polygon } from '@/utils/Icon';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { OpenSearchState, SearchGuState } from '@/recoil/homeState';
import SearchModal from './search/SearchModal';
import ModalPortal from '../modal/ModalPortal';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface HomeLocationSeclectProps {
  onCommunity?: boolean;
}

const HomeLocationSeclect = ({
  onCommunity = false,
}: HomeLocationSeclectProps) => {
  const [locationGu, setLocationGu] = useState<string>('전체');
  const openSearchModal = useRecoilValue(OpenSearchState);
  const setBottomSheetState = useSetRecoilState(bottomSheetState);
  const serachGu = useRecoilValue(SearchGuState);
  const openLocationBottomSheet = () => {
    setBottomSheetState({ isActive: true, type: 'location', link: null });
  };

  useEffect(() => {
    const location = localStorage.getItem('location_gu');
    if (location) {
      setLocationGu(location);
    }
  }, [locationGu, setLocationGu]);

  const pathname = usePathname();
  return (
    <>
      <div
        className="flex gap-2.5 items-center p-2.5 hover:cursor-pointer w-full "
        onClick={openLocationBottomSheet}
      >
        <div
          className={`${
            pathname === '/home' ? 'text-white' : 'text-black'
          } text-base font-semibold leading-relaxed`}
        >
          서울시 {serachGu ?? locationGu}
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
      {openSearchModal && (
        <ModalPortal nodeName="searchPortal">
          <div className="absolute top-0 left-0 bg-white flex flex-col gap-4 w-full h-screen z-50">
            <SearchModal />
          </div>
        </ModalPortal>
      )}
    </>
  );
};
export default HomeLocationSeclect;
