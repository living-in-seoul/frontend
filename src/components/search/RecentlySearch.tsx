'use client';
import { useCallback, useEffect } from 'react';
import Select from '../common/Select';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { recentlySearchedState, searchState } from '@/recoil/communityStates';
import { useRouter } from 'next/navigation';
import { Close } from '../profile/editpage/EditImageIcon';

const RecentlySearch = () => {
  const [recentlySearched, setRecentlySearched] = useRecoilState(
    recentlySearchedState,
  );
  const router = useRouter();
  const setSearchState = useSetRecoilState(searchState);
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
          <li key={item}>
            <Select
              title={`${item.substring(1)}`}
              onClick={(e) => {
                router.replace(`/search?search=${encodeURIComponent(item)}`);
                setSearchState(item);
              }}
              className="rounded-md cursor-pointer relative"
              size="medium"
              Icon={
                <Close
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSearchTerm(item);
                  }}
                />
              }
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecentlySearch;
