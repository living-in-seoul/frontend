'use client';

import { polygonState, postSizeState } from '@/recoil/mapStates';
import FilterOptions from '../filter/FilterOptions';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Header from '@/components/layouts/Header';
import Back from '@/components/common/Back';

const MapHeader = () => {
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

  const CurrentPlace = useCallback(
    (): JSX.Element => (
      <span className="font-semibold grow text-[1.1rem]">
        {`서울시 ${headerText} ${polygonValue.gu && polygonValue.dong}`}
      </span>
    ),
    [headerText, polygonValue.dong, polygonValue.gu],
  );
  const CurrentBoardSize = (): JSX.Element => (
    <div className="flex justify-center items-center bg-gray7 px-5 py-[5px] rounded-2xl text-[0.8rem]">
      <span className="text-gray-600">게시물</span>
      <span className="ml-1 text-darkMint">{postSize}건</span>
    </div>
  );
  return (
    <section className="absolute bg-white top-0 flex flex-col justify-center w-full pt-10 z-50">
      <Header
        left={<Back />}
        center={<CurrentPlace />}
        right={<CurrentBoardSize />}
      />
      <FilterOptions />
    </section>
  );
};

export default MapHeader;
