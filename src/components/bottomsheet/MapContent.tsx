'use client';
import { useRecoilValue } from 'recoil';
import BoardList from '../map/board/BoardList';
import { markerIdState } from '@/recoil/mapStates';

const MapContent = () => {
  const markerIdValue = useRecoilValue(markerIdState);

  return <BoardList markerIdValue={markerIdValue} />;
};
export default MapContent;
