'use client';
import useDebounce from '@/hooks/useDebounce';
import { useCallback, useState } from 'react';
import useSWR from 'swr';
import Input from '../../common/Input';
import { FormEvent } from 'react';
import { useSetRecoilState } from 'recoil';
import { placeIdState } from '@/recoil/mapStates';
import Icons from '@/components/common/Icons';
import { search } from '@/utils/Icon';

const PlacesAutoComplete = () => {
  const [openUl, setOpenUl] = useState<boolean>(false);
  const [inputLocation, setInputLocation] = useState<string>('');
  const debounceKeyword = useDebounce(inputLocation);
  const { data } = useSWR<PlacesResponse>(
    debounceKeyword ? `api/map/search/${debounceKeyword}` : null,
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
    },
    [setPlaceIdState],
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
    <div className="flex flex-col justify-center items-center w-full text-xs">
      <Input
        placeholder="장소 이름을 입력해주세요"
        value={inputLocation}
        onChange={onChangeHandler}
        onSubmit={onSubmit}
        onFocus={onFocusHandler}
        formColor="bg-gray-300"
        inputColor="bg-gray-300"
        rightElement={
          <Icons
            path={search}
            option={{
              fill: 'none',
              stroke: '#040000',
              strokeWidth: '1.8',
              strokeMiterlimit: '10',
            }}
          />
          // path 여러갠디..
          // <svg
          //   width="24"
          //   height="24"
          //   viewBox="0 0 24 24"
          //   fill="none"
          //   xmlns="http://www.w3.org/2000/svg"
          // >
          //   <path
          //     d="M10.4019 16.8038C13.9376 16.8038 16.8038 13.9376 16.8038 10.4019C16.8038 6.86624 13.9376 4 10.4019 4C6.86623 4 4 6.86624 4 10.4019C4 13.9376 6.86623 16.8038 10.4019 16.8038Z"
          //     stroke="#040000"
          //     stroke-width="1.8"
          //     stroke-miterlimit="10"
          //   />
          //   <path
          //     d="M16.8038 16.8038L20 20"
          //     stroke="#040000"
          //     stroke-width="1.8"
          //     stroke-miterlimit="10"
          //     stroke-linecap="round"
          //   />
          // </svg>
        }
      />
      {openUl && (
        <ul className="flex flex-col justify-center bg-white w-full rounded-xl h-full">
          {data?.predictions.map((location, _) => {
            const { place_id, structured_formatting } = location;
            const parts = structured_formatting.main_text.split(
              new RegExp(`(${debounceKeyword})`, 'gi'),
            );

            return (
              <li
                className="px-3 py-3.5 flex justify-start items-center "
                key={place_id}
                onClick={() => onClickHandler(place_id)}
              >
                <Icons path={search} />
                {structured_formatting.main_text}
              </li>
            );
          })}
          {data?.predictions.length === 0 && <li>검색 결과가 없습니다.</li>}
        </ul>
      )}
    </div>
  );
};

export default PlacesAutoComplete;
