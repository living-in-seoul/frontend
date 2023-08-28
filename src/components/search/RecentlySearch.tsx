'use client';
import { useCallback, useEffect, useState } from 'react';
import Icons from '../common/Icons';
import Select from '../common/Select';
import { useRecoilState } from 'recoil';
import { recentlySearchedState } from '@/recoil/communityStates';
interface CloseProps {
  onClick: () => void;
}

const Close = ({ onClick }: CloseProps) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
      >
        <g clipPath="url(#clip0_980_1515)">
          <path
            d="M8 0L0 8M0 0L8 8"
            stroke="#787878"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_980_1515">
            <rect width="8" height="8" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

const RecentlySearch = () => {
  const [recentlySearched, setRecentlySearched] = useRecoilState(
    recentlySearchedState,
  );

  useEffect(() => {
    const storedSearch = localStorage.getItem('recentlySearched');
    if (storedSearch) {
      setRecentlySearched(JSON.parse(storedSearch));
    }
  }, [setRecentlySearched]);

  const removeSearchTerm = useCallback(
    (term: string) => {
      const updatedTerms = recentlySearched.filter((item) => item !== term);
      setRecentlySearched(updatedTerms);
      localStorage.setItem('recentlySearched', JSON.stringify(updatedTerms));
    },
    [recentlySearched, setRecentlySearched],
  );

  return (
    <section className="pt-[30px]">
      <div className="w-40 text-black text-base font-semibold leading-none">
        최근 검색어
      </div>
      <ul className="flex gap-2.5 py-5 whitespace-nowrap scrollbar-hide overflow-x-auto">
        {recentlySearched.map((item) => (
          <Select
            title={`${item}`}
            key={item}
            className="rounded-md"
            size="large"
            disable
            Icon={<Close onClick={() => removeSearchTerm(item)} />}
          />
        ))}
      </ul>
    </section>
  );
};

export default RecentlySearch;
