'use client';
import useDebounce from '@/hooks/useDebounce';
import { useState } from 'react';
import useSWR from 'swr';
import SearchInput from '../common/SearchInput';

interface PlacesAutoCompleteProps {
  onSelectPlace: (placeId: string) => void;
}

const PlacesAutoComplete = ({ onSelectPlace }: PlacesAutoCompleteProps) => {
  const [inputLocation, setInputLocation] = useState<string>('');
  const debounceKeyword = useDebounce(inputLocation);
  const { data, isLoading } = useSWR<PlacesResponse>(
    debounceKeyword ? `api/map/${debounceKeyword}` : null,
  );

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLocation(e.target.value);
  };

  return (
    <section className=" absolute top-0 left-0 z-50 flex flex-col justify-center items-center w-full pt-4 text-xs">
      <SearchInput
        placeholder="서초구 서초동"
        value={inputLocation}
        onChange={onChangeHandler}
      />
      {isLoading && <div>loading!</div>}

      <ul className="bg-white w-full rounded-xl">
        {data?.predictions.map((location, _) => {
          const { place_id, structured_formatting } = location;
          return (
            <li
              className="pl-3 py-1 "
              key={place_id}
              onClick={() => onSelectPlace(place_id)}
            >
              {structured_formatting.main_text}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default PlacesAutoComplete;
