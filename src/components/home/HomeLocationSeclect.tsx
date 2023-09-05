'use client';

import Icons from '@/components/common/Icons';
import { bottomSheetState } from '@/recoil/bottomsheet';
import { polygon } from '@/utils/Icon';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { OpenSearchState, SearchGuState } from '@/recoil/homeState';
import SearchModal from './search/SearchModal';
import ModalPortal from '../modal/ModalPortal';
import { useEffect } from 'react';

interface HomeLocationSeclectProps {
  onCommunity?: boolean;
}

const HomeLocationSeclect = ({
  onCommunity = false,
}: HomeLocationSeclectProps) => {
  const openSearchModal = useRecoilValue(OpenSearchState);
  const setBottomSheetState = useSetRecoilState(bottomSheetState);
  const serachGu = useRecoilValue(SearchGuState);
  const openLocationBottomSheet = () => {
    setBottomSheetState({ isActive: true, type: 'location', link: null });
  };
  return (
    <>
      <div
        className="flex gap-2.5 items-center p-2.5 hover:cursor-pointer w-full "
        onClick={openLocationBottomSheet}
      >
        <p className="text-white font-semibold">서울시 전체</p>
        <Icons
          path={polygon}
          fill="none"
          option={{
            fill: `${onCommunity ? 'black' : 'white'}`,
          }}
        />
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
