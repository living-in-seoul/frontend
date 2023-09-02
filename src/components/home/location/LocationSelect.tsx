'use client';

import Icons from '@/components/common/Icons';
import {
  LocationSelectIcon,
  SearchIcon,
} from '@/components/profile/editpage/EditImageIcon';
import { polygonState } from '@/recoil/mapStates';
import { filledLocation } from '@/utils/Icon';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import Link from 'next/link';
import Input from '@/components/common/Input';

const LocationSelect = () => {
  const [polygon, setPolygon] = useRecoilState(polygonState);
  const [selected, setSelected] = useState<'lastVisited' | 'myhome'>('myhome');
  const lastVisited = localStorage.getItem('lastVisited');

  return (
    <section className="flex flex-col justify-center items-center gap-5">
      <h1 className="font-bold">주소 설정</h1>
      <div className="w-full h-9  rounded-3xl">
        <Input
          placeholder="구, 동으로 검색"
          formColor="bg-gray7"
          inputColor="bg-gray7"
          rightElement={<SearchIcon />}
          // onClick={}
        />
      </div>

      <div className="flex justify-center items-center border border-neutral-300 w-full py-1.5 rounded-lg gap-1 cursor-pointer">
        {LocationSelectIcon()}
        <div className="text-sm ">현재 위치로 설정하기</div>
      </div>
      <div className="w-full h-28 border-t-4 border-neutral-300">
        <div className="flex items-center h-1/2 px-2 gap-3 cursor-pointer">
          <Icons path={filledLocation} option={{ fill: '' }} />
          <div className="flex flex-col">
            <div className="relative text-sm font-bold ">
              나의 동네 <p className="absolute top-0 right-[-25%]">지정</p>
            </div>
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
