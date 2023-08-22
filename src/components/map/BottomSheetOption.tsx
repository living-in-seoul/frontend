'use client';
import { useRecoilValue } from 'recoil';
import { toggleMapState } from '@/recoil/mapStates';
import BoardList from './board/BoardList';

const BottomSheetOption = () => {
  const toggleMapValue = useRecoilValue(toggleMapState);

  return (
    <section>
      {toggleMapValue === 'community' ? <BoardList /> : <div>transport</div>}
    </section>
  );
};

export default BottomSheetOption;
