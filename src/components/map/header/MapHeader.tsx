'use client';

import FilterOptions from '../filter/FilterOptions';
import Icons from '@/components/common/Icons';
import { gudongState } from '@/recoil/mapStates';
import { useRecoilState } from 'recoil';
import { back } from '@/utils/Icon';
import { useRouter } from 'next/navigation';

const MapHeader = () => {
  const router = useRouter();
  const [gudong, setGudong] = useRecoilState(gudongState);

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
        <span className="font-semibold text-[1.1rem]">
          {gudong === '' ? '서울시 전체' : gudong}
        </span>
      </div>
      <FilterOptions />
    </section>
  );
};

export default MapHeader;
