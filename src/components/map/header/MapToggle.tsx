'use client';

import Toggle from '@/components/common/Toggle';
import { gudongState, toggleMapState } from '@/recoil/mapStates';
import { useRecoilState } from 'recoil';

type mapOptions = { key: MapToggle; name: string }[];

const MapToggle = () => {
  const [toggleMap, setToggleMap] = useRecoilState(toggleMapState);
  const [gudong, setGudong] = useRecoilState(gudongState);
  const OPTIONS: mapOptions = [
    { key: 'community', name: '커뮤니티' },
    { key: 'transport', name: '교통정보' },
  ];

  const toggleHandler = (option: MapToggle) => {
    setToggleMap(option);
  };

  return (
    <div className="flex justify-between items-center w-full h-[70%] p-8">
      <div className="font-semibold text-lg">{gudong}</div>
      <Toggle
        options={OPTIONS}
        active={toggleMap}
        toggleHandler={toggleHandler}
      />
    </div>
  );
};

export default MapToggle;
