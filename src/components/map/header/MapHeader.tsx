'use client';

import { polygonState } from '@/recoil/mapStates';
import FilterOptions from '../filter/FilterOptions';
import Icons from '@/components/common/Icons';
import { back } from '@/utils/Icon';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

const MapHeader = () => {
  const router = useRouter();
  const polygonValue = useRecoilValue(polygonState);

  const onClickToBack = () => {
    router.back();
  };

  return (
    <section className="flex flex-col justify-center items-center  pt-5 gap-3 absolute bg-white w-full top-0 h-28 z-10">
      <div className="flex w-full justify-start items-center gap-3 px-7 ">
        <Icons
          path={back}
          onClick={onClickToBack}
          className="hover:cursor-pointer"
        />
        <span className="font-semibold text-[1.1rem]">{`서울시 
          ${polygonValue.gu} ${polygonValue.dong}`}</span>
      </div>
      <FilterOptions />
    </section>
  );
};

export default MapHeader;
