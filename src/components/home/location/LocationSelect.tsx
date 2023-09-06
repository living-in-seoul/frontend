'use client';

import Icons from '@/components/common/Icons';
import {
  LocationSelectIcon,
  SearchIcon,
} from '@/components/profile/editpage/EditImageIcon';
import { centerState, currentState, polygonState } from '@/recoil/mapStates';
import { filledLocation } from '@/utils/Icon';
import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Link from 'next/link';
import Input from '@/components/common/Input';
import { InputRefState, OpenSearchState } from '@/recoil/homeState';
import {
  bottomSheetState,
  locationBottomSheetState,
} from '@/recoil/bottomsheet';

const LocationSelect = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [polygon, setPolygon] = useRecoilState(polygonState);
  const [selected, setSelected] = useState<'lastVisited' | 'myhome'>('myhome');
  const setOpenSearchModal = useSetRecoilState(OpenSearchState);
  const setisBottomSheetState = useSetRecoilState(locationBottomSheetState);
  const setBottomSheetState = useSetRecoilState(bottomSheetState);
  const setCurrentState = useSetRecoilState(currentState);
  const setCenterState = useSetRecoilState(centerState);
  const inputRef = useRecoilValue(InputRefState);
  const lastVisited = localStorage.getItem('lastVisited');

  const onClickForCurrent = () => {
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
        setIsLoading(false);
      },
    );
  };

  const onClickToSearch = () => {
    setBottomSheetState({
      isActive: false,
      type: 'location',
      link: null,
    });
    console.log(inputRef.current, inputRef);
    inputRef.current?.focus();
    setOpenSearchModal(true);
  };
  return (
    <section className="flex flex-col justify-center items-center gap-5">
      <h1 className="font-bold">주소 설정</h1>
      <div className="w-full  rounded-3xl">
        <div className="mx-4 flex flex-col gap-4 ">
          <div
            onClick={onClickToSearch}
            className={`rounded-3xl w-full h-9 flex items-center justify-between shadow-sm px-4 bg-gray7`}
          >
            <span className="outline-none text-sm w-full pl-3 bg-gray text-[#B8B8B8]">
              구, 동으로 검색
            </span>
            <SearchIcon />
          </div>
          <div className="flex justify-center items-center w-full border border-neutral-300 py-1.5 rounded-lg gap-1.5 cursor-pointer ">
            {LocationSelectIcon()}
            <div className="text-sm" onClick={onClickForCurrent}>
              현재 위치로 설정하기
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-28 border-t-4 border-neutral-300">
        <div className="flex items-center h-1/2 px-2 gap-3 cursor-pointer">
          <Icons path={filledLocation} option={{ fill: '' }} />
          <div className="flex flex-col">
            <p className="relative text-sm font-bold ">나의 동네 지정</p>
            {/* 현위치로 변경 */}
            <p className="text-xs text-neutral-500">서초구 서초동</p>
          </div>
        </div>
        <div className=" flex items-center h-1/2 border-t border-neutral-300 px-2 gap-3 cursor-pointer">
          <Icons path={filledLocation} option={{ fill: '#404040' }} />
          <div className="flex flex-col">
            <p className="text-sm font-bold">자주 가는 동네 추가</p>
            {/* 동네 추가 하고 localstorage에 추가 */}
            <p className="text-xs text-neutral-500">서울시 {lastVisited}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSelect;
