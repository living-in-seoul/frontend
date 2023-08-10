'use client';

import { useEffect, useState } from 'react';
import BottomSheetHeader from './bottomsheet/BottomSheetHeader';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { MIN_Y } from './bottomsheet/constants';
import BottomSheetContent from './bottomsheet/BottomSheetContent';

interface MapBottomSheet {
  places: Place[];
}

const MapBottomSheet = ({ places }: MapBottomSheet) => {
  const [maxY, setMaxY] = useState<number>(0);
  const [sheetHeight, setSheetHeight] = useState<number>(0);
  const { sheet, content } = useBottomSheet(maxY);

  useEffect(() => {
    const MAX_Y = window.innerHeight - 240;
    const BOTTOM_SHEET_HEIGHT = window.innerHeight - MIN_Y;
    setMaxY(MAX_Y);
    setSheetHeight(BOTTOM_SHEET_HEIGHT);
  }, [maxY]);

  return (
    <div
      ref={sheet}
      style={{ height: `${sheetHeight}px` }}
      className={`flex flex-col justify-center items-center fixed top-[calc(100%-120px)] left-0 rounded-t-3xl bg-slate-50 z-1 w-full border-t-2 p-2 shadow-2xl ease-out`}
    >
      <BottomSheetHeader />
      <div className="h-full" ref={content}>
        <BottomSheetContent places={places} />
      </div>
    </div>
  );
};

export default MapBottomSheet;
