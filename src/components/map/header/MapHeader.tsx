'use client';

import FilterOptions from '../filter/FilterOptions';
import Icons from '@/components/common/Icons';
import { back } from '@/utils/Icon';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MapHeader = () => {
  const router = useRouter();
  const [gu, setGu] = useState<string>('');

  useEffect(() => {
    const gu = localStorage.getItem('location');
    gu ? setGu(gu) : setGu('전체');
  }, []);

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
        <span className="font-semibold text-[1.1rem]">{`서울시 ${gu}`}</span>
      </div>
      <FilterOptions />
    </section>
  );
};

export default MapHeader;
