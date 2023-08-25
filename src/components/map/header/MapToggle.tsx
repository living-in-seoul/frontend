'use client';

import Toggle from '@/components/common/Toggle';
import Icons from '@/components/common/Icons';
import { gudongState, toggleMapState } from '@/recoil/mapStates';
import { useRecoilState } from 'recoil';
import { back } from '@/utils/Icon';
import { useRouter } from 'next/navigation';

type mapOptions = { key: MapToggle; name: string }[];

const MapToggle = () => {
  const router = useRouter();
  const [toggleMap, setToggleMap] = useRecoilState(toggleMapState);
  const [gudong, setGudong] = useRecoilState(gudongState);
  const OPTIONS: mapOptions = [
    { key: 'community', name: '커뮤니티' },
    { key: 'transport', name: '교통정보' },
  ];

  const toggleHandler = (option: MapToggle) => {
    setToggleMap(option);
  };

  const onClickToBack = () => {
    router.back();
  };

  return (
    <div className="flex justify-between items-center w-full h-[70%] px-5">
      <div className="flex justify-center items-center gap-3">
        <Icons
          path={back}
          onClick={onClickToBack}
          className="hover:cursor-pointer"
        />
        <span className="font-semibold text-lg">{gudong}</span>
      </div>
      <Toggle
        options={OPTIONS}
        active={toggleMap}
        toggleHandler={toggleHandler}
      />
    </div>
  );
};

export default MapToggle;
