'use client';
import Icons from '@/components/common/Icons';
import { centerState, currentState } from '@/recoil/mapStates';
import { currentLoaction } from '@/utils/Icon';
import { useSetRecoilState } from 'recoil';

const CurrentLocation = () => {
  const setCenterState = useSetRecoilState(centerState);
  const setCurrentState = useSetRecoilState(currentState);

  const onClickHandler = () => {
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
      },
      () => console.log('동의해라'), //동의하라고 모달 띄우기
    );
  };

  return (
    <div
      className="p-2 bg-white rounded-full shadow-3xl hover:cursor-pointer"
      onClick={onClickHandler}
    >
      <Icons path={currentLoaction} />
    </div>
  );
};

export default CurrentLocation;
