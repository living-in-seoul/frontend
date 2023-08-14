'use client';
import useDebounce from '@/hooks/useDebounce';
import { useCallback, useState } from 'react';
import useSWR from 'swr';
import SearchInput from '../../common/SearchInput';
import { FormEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import { openFilterState, placeIdState } from '@/recoil/mapStates';
import { useRouter } from 'next/navigation';

const PlacesAutoComplete = () => {
  const router = useRouter();
  const [openUl, setOpenUl] = useState<boolean>(false);
  const [inputLocation, setInputLocation] = useState<string>('');
  const debounceKeyword = useDebounce(inputLocation);
  const { data, isLoading } = useSWR<PlacesResponse>(
    debounceKeyword ? `api/map/${debounceKeyword}` : null,
  );
  const setPlaceIdState = useSetRecoilState(placeIdState);
  const setOpenFilterState = useSetRecoilState(openFilterState);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLocation(e.target.value);
  };

  const onFocusHandler = () => {
    setOpenUl(true);
  };

  const onClickHandler = useCallback(
    (placeId: string) => {
      setPlaceIdState(placeId);
      setOpenUl(false);
      setInputLocation('');
      router.push(`/place/${placeId}/2`);
    },
    [router, setPlaceIdState],
  );

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (data) {
        setPlaceIdState(data.predictions[0].place_id);
      }
      setOpenUl(false);
    },
    [data, setPlaceIdState],
  );

  const onOpenFilterIcon = () => {
    setOpenFilterState(true);
  };

  return (
    <section className="flex flex-col justify-center items-center w-full pt-4 text-xs">
      {isLoading && <div>loading!</div>}
      <SearchInput
        placeholder="서초구 서초동"
        value={inputLocation}
        onChange={onChangeHandler}
        onSubmit={onSubmit}
        onFocus={onFocusHandler}
        onClick={onOpenFilterIcon}
      />
      {openUl && (
        <ul className="flex flex-col justify-center items-center bg-white w-full rounded-xl h-full">
          {data?.predictions.map((location, _) => {
            const { place_id, structured_formatting } = location;
            return (
              <li
                className="pl-3 py-2 "
                key={place_id}
                onClick={() => onClickHandler(place_id)}
              >
                {structured_formatting.main_text}
              </li>
            );
          })}
          {data?.predictions.length === 0 && <li>검색 결과가 없습니다.</li>}
        </ul>
      )}
    </section>
  );
};

export default PlacesAutoComplete;
