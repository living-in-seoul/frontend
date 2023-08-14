'use client';
import useDebounce from '@/hooks/useDebounce';
import { useCallback, useState } from 'react';
import useSWR from 'swr';
import SearchInput from '../../common/SearchInput';
import { FormEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import { placeIdState } from '@/recoil/states';
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

  return (
    <section className="absolute top-0 left-0 z-50 flex flex-col justify-center items-center w-full pt-4 text-xs">
      {isLoading && <div>loading!</div>}
      <SearchInput
        placeholder="서초구 서초동"
        value={inputLocation}
        onChange={onChangeHandler}
        onSubmit={onSubmit}
        onFocus={onFocusHandler}
      />
      {openUl && (
        <ul className="bg-white w-full rounded-xl">
          {data?.predictions.map((location, _) => {
            const { place_id, structured_formatting } = location;
            return (
              <li
                className="pl-3 py-1 "
                key={place_id}
                onClick={() => onClickHandler(place_id)}
              >
                {structured_formatting.main_text}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default PlacesAutoComplete;