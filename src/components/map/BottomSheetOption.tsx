'use client';
import { useRecoilValue } from 'recoil';
import {
  boardListState,
  markerIdState,
  toggleMapState,
} from '@/recoil/mapStates';
import BoardList from './board/BoardList';

const BottomSheetOption = () => {
  const toggleMapValue = useRecoilValue(toggleMapState);
  const boardList = useRecoilValue(boardListState);
  const markerIdValue = useRecoilValue(markerIdState);

  return (
    <section>
      {toggleMapValue === 'community' ? (
        <BoardList boardList={boardList} markerIdValue={markerIdValue} />
      ) : (
        <div>transport</div>
      )}
    </section>
  );
};

export default BottomSheetOption;
