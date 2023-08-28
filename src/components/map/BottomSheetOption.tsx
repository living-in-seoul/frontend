'use client';
import { useRecoilValue } from 'recoil';
import { boardListState, markerIdState } from '@/recoil/mapStates';
import BoardList from './board/BoardList';

const BottomSheetOption = () => {
  const boardList = useRecoilValue(boardListState);
  const markerIdValue = useRecoilValue(markerIdState);

  return (
    <section>
      <BoardList boardList={boardList} markerIdValue={markerIdValue} />
    </section>
  );
};

export default BottomSheetOption;
