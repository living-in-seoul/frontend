'use client';
import useOutsideClick from '@/hooks/useOutsideClick';
import { isBottomSheetState } from '@/recoil/communityStates';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

interface BottomSheetProps {
  children: ReactNode;
}

const BottomSheet = ({ children }: BottomSheetProps) => {
  const [isBottomSheetOpen, setisBottomSheetState] =
    useRecoilState(isBottomSheetState);
  const scrollY = useRef(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useOutsideClick(ref, () => {
    setisBottomSheetState(false);
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

  return (
    <div className="relative bg-black w-full h-full">
      <div
        ref={ref}
        className={`fixed max-w-md bg-white z-50 bottom-0 border-t-2 rounded-tl-2xl rounded-tr-2xl px-4 py-7 shadow-2xl border-neutral-200 left-1/2 -translate-x-1/2 w-full transform transition-transform duration-500 ${
          isBottomSheetOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;
