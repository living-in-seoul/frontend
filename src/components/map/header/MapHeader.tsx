'use client';

import { polygonState, postSizeState } from '@/recoil/mapStates';
import FilterOptions from '../filter/FilterOptions';
import Icons from '@/components/common/Icons';
import { back } from '@/utils/Icon';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const MapHeader = () => {
  const router = useRouter();
  const [headerText, setHeaderText] = useState<string | null>('');
  const [postSize, setPostSize] = useRecoilState(postSizeState);
  const polygonValue = useRecoilValue(polygonState);
  useEffect(() => {
    const localGu = localStorage.getItem('location_gu');
    if (!polygonValue.gu) {
      setHeaderText(localGu);
    } else {
      setHeaderText(polygonValue.gu);
    }
  }, [polygonValue.gu]);

  const onClickToBack = () => {
    router.back();
  };

  return (
    <section className="flex flex-col justify-center items-center pt-5 gap-3 absolute bg-white w-full top-0 h-28 z-10">
      <div className="flex w-full justify-between items-center gap-3 px-5 ">
        <div className="relative flex justify-center items-center gap-3">
          <Icons
            path={back}
            onClick={onClickToBack}
            className="hover:cursor-pointer"
          />
          <span className="font-semibold text-[1.1rem]">{`서울시 
          ${headerText} ${polygonValue.gu && polygonValue.dong}`}</span>
        </div>
        <div className="flex justify-center items-center bg-gray7 px-5 py-[5px] rounded-2xl text-[0.8rem]">
          <span className="text-gray-600">게시물</span>
          <span className="ml-1 text-darkMint">{postSize}건</span>
        </div>
      </div>
      <FilterOptions />
    </section>
  );
};

export default MapHeader;
