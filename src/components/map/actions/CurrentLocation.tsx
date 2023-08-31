'use client';
import Icons from '@/components/common/Icons';
import BeatLoader from '@/components/common/Spinner';
import { centerState, currentState } from '@/recoil/mapStates';
import { currentLoaction } from '@/utils/Icon';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

const CurrentLocation = () => {
  const setCenterState = useSetRecoilState(centerState);
  const [isLoading, setIsLoading] = useState(false);
  const setCurrentState = useSetRecoilState(currentState);

  const onClickHandler = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        setCenterState({
          lat: latitude,
          lng: longitude,
        });
        setCurrentState({
          lat: latitude,
          lng: longitude,
        });
        setIsLoading(false);
      },
      () => {
        console.log('동의해라');
        setIsLoading(false);
      }, //동의하라고 모달 띄우기
    );
  };

  return (
    <div
      className="w-12 h-12 flex justify-center items-center bg-white rounded-full shadow-md hover:cursor-pointer"
      onClick={onClickHandler}
    >
      {isLoading ? (
        <BeatLoader size={10} color="#2DDAB0" />
      ) : (
        <Icons path={currentLoaction} />
      )}
    </div>
  );
};

export default CurrentLocation;
