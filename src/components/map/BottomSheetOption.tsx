'use client';
import { useRecoilValue } from 'recoil';
import { markerIdState } from '@/recoil/mapStates';
import BoardList from './board/BoardList';
import BottomSheet from '../BottomSheet';
import { mapBottomSheetState } from '@/recoil/bottomsheet';

const BottomSheetOption = () => {
  const markerIdValue = useRecoilValue(markerIdState);

  return (
    <section>
      <BottomSheet type="map" state={mapBottomSheetState}>
        <BoardList markerIdValue={markerIdValue} />
      </BottomSheet>
    </section>
  );
};

export default BottomSheetOption;
