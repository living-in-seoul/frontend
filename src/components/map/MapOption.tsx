'use client';
import { useRecoilValue } from 'recoil';
import { toggleMapState } from '@/recoil/mapStates';
import CommunityMap from './CommunityMap';
import MyMap from './TransportMap';

const MapOption = () => {
  const toggleMapValue = useRecoilValue(toggleMapState);

  return (
    <div>{toggleMapValue === 'community' ? <CommunityMap /> : <MyMap />}</div>
  );
};

export default MapOption;
