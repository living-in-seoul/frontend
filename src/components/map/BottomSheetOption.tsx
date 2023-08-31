'use client';
import { useRecoilState, useRecoilValue } from 'recoil';
import { boardListState, markerIdState } from '@/recoil/mapStates';
import BoardList from './board/BoardList';
import BottomSheet from '../BottomSheet';
import { isBottomSheetState } from '@/recoil/communityStates';
import { useEffect } from 'react';

const BottomSheetOption = () => {
  const [isBottomSheetOpen, setisBottomSheetState] =
    useRecoilState(isBottomSheetState);
  // const boardList = useRecoilValue(boardListState);
  const markerIdValue = useRecoilValue(markerIdState);

  return (
    <section>
      <BottomSheet type="map">
        <BoardList
          // boardList={boardList}
          markerIdValue={markerIdValue}
        />
      </BottomSheet>
    </section>
  );
};

export default BottomSheetOption;
