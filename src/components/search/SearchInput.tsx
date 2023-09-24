'use client';
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Icons from '../common/Icons';
import useDebounce from '@/hooks/useDebounce';
import { SearchBack, SearchIcon } from '@/utils/Icon';
import { useSearchParams } from 'next/navigation';
import { addRecentlySearched } from '@/utils/utilFunc';
import { useRecoilState } from 'recoil';
import { searchState } from '@/recoil/communityStates';
import { useRouter } from 'next-nprogress-bar';
import Header from '../layouts/Header';
import Back from '../common/Back';

interface responseInterface {
  PostId: number;
  PostTag: string;
  PostContent: string;
}

const SearchInput = () => {
  const [search, setSearch] = useRecoilState(searchState);
  const [data, setData] = useState<responseInterface[]>([]);
  const [showlist, setShowList] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const debounceKeyword = useDebounce(search, 300);
  const router = useRouter();
  const searchParams = useSearchParams();
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    [setSearch],
  );

  useEffect(() => {
    const searchFetch = async () => {
      if (!debounceKeyword) return;
      const Keyword = encodeURIComponent(debounceKeyword);
      const response = await fetch(`/api/community/search?search=${Keyword}`);
      const result = await response.json();
      setData(result);
    };

    searchFetch();
    // setShowList(false);
  }, [debounceKeyword]);

  const onClickHandler = async (search: string) => {
    addRecentlySearched(search);
    setSearch(search);
    const res = await fetch(`/api/community/search`, {
      method: 'POST',
      body: JSON.stringify({
        query: search,
      }),
    });
    router.push(`/search?search=${encodeURIComponent(search)}`);
    ref.current?.blur();
    setData([]);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch(`/api/community/search`, {
      method: 'POST',
      body: JSON.stringify({
        query: search,
      }),
    });
    addRecentlySearched(search);
    setData([]);
    ref.current?.blur();
    router.push(`/search?search=${encodeURIComponent(search)}`);
  };

  return (
    <form onSubmit={onSubmit} className="grow">
      <input
        className="w-full h-9 bg-zinc-100 rounded-3xl px-[18px] py-2.5 placeholder:text-zinc-400 text-base font-normal leading-none focus:outline-none"
        placeholder="#해시태그 혹은 내용을 입력해 주세요"
        ref={ref}
        value={search}
        onChange={onChange}
        onFocus={() => setShowList(true)}
        onBlur={() => {
          setTimeout(() => {
            setShowList(false);
          }, 150);
        }}
      />
      <ul
        className="absolute top-28 left-0 right-0 overflow-y-scroll z-50 bg-white"
        hidden={!showlist}
        role="listbox"
      >
        {data.length ? (
          data.map((item) => (
            <li
              className="w-full border-b border-zinc-300 cursor-pointer pl-[13px] py-[19px] hover:bg-sky-100 active:bg-sky-100"
              key={item.PostId}
              onClick={() => onClickHandler(item.PostTag)}
            >
              <div className="w-full flex justify-between items-center gap-2.5">
                <Icons
                  path={SearchIcon}
                  fill="none"
                  option={{
                    stroke: '#B8B8B8',
                    strokeWidth: '1.8',
                    strokeLinecap: 'round',
                    strokeMiterlimit: '10',
                  }}
                />
                <div
                  className="grow text-black text-sm font-normal leading-none"
                  dangerouslySetInnerHTML={{ __html: item.PostContent }}
                ></div>
              </div>
            </li>
          ))
        ) : (
          <li className="w-full border-b border-zinc-300 cursor-pointer pl-[13px] py-[19px]">
            검색 결과가 없습니다.
          </li>
        )}
      </ul>
    </form>
  );
};
export default SearchInput;
