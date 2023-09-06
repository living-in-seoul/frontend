'use client';

import Icons from '@/components/common/Icons';
import Input from '@/components/common/Input';
import { LocationSelectIcon } from '@/components/profile/editpage/EditImageIcon';
import { centerState, currentState } from '@/recoil/mapStates';
import { SearchIcon, back } from '@/utils/Icon';
import { useRecoilState } from 'recoil';
import { useCallback, useEffect, useRef, useState } from 'react';
import { OpenSearchState, SearchGuState } from '@/recoil/homeState';
import BeatLoader from 'react-spinners/BeatLoader';
import { useSetRecoilState } from 'recoil';
import DisplayLi from './DisplayLi';
import { GUARRAY } from '@/utils/constants/constants';
import HomeTagSections from '../review/HomeTagSections';
import useOutsideClick from '@/hooks/useOutsideClick';

const SearchModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setCenterState = useSetRecoilState(centerState);
  const setCurrentState = useSetRecoilState(currentState);
  const setSearchGuState = useSetRecoilState(SearchGuState);
  const [openSearchModal, setOpenSearchModal] = useRecoilState(OpenSearchState);
  const [openUl, setOpenUl] = useState(false);
  const [predictions, setPredictions] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const scrollY = useRef(0);

  const onClickToBack = () => {
    setOpenSearchModal(false);
  };

  const onFocusHandler = () => {
    setOpenUl(true);
  };

  const onClickHandler = (gu: string) => {
    localStorage.setItem('location_gu', gu);
    setOpenUl(false);
    setOpenSearchModal(false);
    setSearchGuState(gu);
  };

  const onClickForCurrent = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        setCenterState({
          lat: latitude,
          lng: longitude,
        });
        setCurrentState({
          lat: latitude,
          lng: longitude,
        });
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
      },
    );
  };

  useEffect(() => {
    const getPredictions = (keyword: string, dataArray: string[]): string[] => {
      const filtered = dataArray.filter((item) => item.includes(keyword));
      const sorted = filtered.sort(
        (a, b) => a.indexOf(keyword) - b.indexOf(keyword),
      );
      return sorted;
    };

    const updatedPredictions = getPredictions(keyword, GUARRAY);
    setPredictions(updatedPredictions);
  }, [keyword]);

  useEffect(() => {
    if (openSearchModal) {
      scrollY.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.classList.add('modal-open');
      document.body.style.top = `-${scrollY.current}px`;
    }
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      window.scrollTo(0, scrollY.current);
    };
  }, [openSearchModal, setOpenSearchModal]);
  return (
    <>
      <div className="flex justify-center items-center w-full px-5 gap-5">
        <Icons
          path={back}
          onClick={onClickToBack}
          className="hover:cursor-pointer"
        />
        <div className="w-4/5 ">
          <Input
            placeholder="구를 검색해주세요."
            formColor="bg-gray7"
            inputColor="bg-gray7"
            className="w-full"
            value={keyword}
            onFocus={onFocusHandler}
            onChange={(e) => setKeyword(e.target.value)}
            rightElement={
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
            }
          />
        </div>
      </div>
      <div className="flex justify-center items-center border border-neutral-300 w-full py-1.5 rounded-lg gap-1 cursor-pointer mb-2">
        {LocationSelectIcon()}
        <div className="text-sm " onClick={onClickForCurrent}>
          {isLoading ? <BeatLoader /> : <span>현재 위치로 설정하기</span>}
        </div>
      </div>
      <div className="relative">
        {openUl && keyword && (
          <DisplayLi
            predictions={predictions}
            keyword={keyword}
            onClick={onClickHandler}
          />
        )}
        <div className="flex flex-col ">
          <h1 className="font-semibold text-gray1 mb-3">최근 검색한 동네</h1>
          <div className="flex gap-2">
            <HomeTagSections type="locations" HotTagReview={[]} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
