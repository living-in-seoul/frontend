'use client';
import React, { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { bottomSheetState } from '@/recoil/bottomsheet';
import LocationSelect from '../home/location/LocationSelect';
import useOutsideClick from '@/hooks/useOutsideClick';
import {
  DefaultContent,
  LoginContent,
  MapContent,
  WriteSelect,
} from '../bottomsheet';

const BottomSheet = () => {
  const scrollY = useRef(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const [bottomSheetInfo, setBottomSheetState] =
    useRecoilState(bottomSheetState);
  const isBottomSheetOpen = bottomSheetInfo.isActive;

  useOutsideClick(ref, () => {
    setBottomSheetState({ ...bottomSheetInfo, isActive: false });
  });

  useEffect(() => {
    if (isBottomSheetOpen) {
      scrollY.current = window.scrollY;
      document.body.classList.add('modal-open');
      document.body.style.top = `-${scrollY.current}px`;
    } else {
      document.body.classList.remove('modal-open');
      window.scrollTo(0, scrollY.current);
    }
  }, [isBottomSheetOpen]);

  const renderContent = () => {
    switch (bottomSheetInfo.type) {
      case 'login':
        return <LoginContent />;
      case 'write':
        return <WriteSelect />;
      case 'map':
        return <MapContent />;
      case 'location':
        return <LocationSelect />;
      default:
        return <DefaultContent />;
    }
  };
  return (
    <div className="relative w-full h-full">
      <div
        className={`z-50 fixed inset-0 max-w-md w-full left-1/2 -translate-x-1/2 transition-opacity duration-300 ${
          isBottomSheetOpen
            ? bottomSheetInfo.type === 'map'
              ? ''
              : 'bg-black opacity-50'
            : 'opacity-0 pointer-events-none'
        }`}
      ></div>

      <div
        ref={ref}
        className={`fixed max-w-md bg-white z-50 bottom-0 border-t-2 rounded-tl-2xl rounded-tr-2xl pt-7 pb-5 shadow-2xl border-neutral-200 left-1/2 -translate-x-1/2 w-full transform transition-transform duration-500 ${
          isBottomSheetOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default BottomSheet;
