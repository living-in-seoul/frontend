'use client';
import { useEffect, useState } from 'react';
import BottomSheetHeader from './BottomSheetHeader';
import { useBottomSheet } from '@/hooks/useBottomSheet';

interface MapBottomSheetProps {
  children: React.ReactNode;
}
const MapBottomSheet = ({ children }: MapBottomSheetProps) => {
  const [sheetHeight, setSheetHeight] = useState<number>(130);

  const MIN = 60;
  const { sheet, content } = useBottomSheet(MIN);

  useEffect(() => {
    setSheetHeight(window.innerHeight - MIN);
  }, []);

  return (
    <section
      style={{
        transform: `translateY(-${sheetHeight})`,
        transition: 'transform 150ms ease-out',
        height: `${sheetHeight}px`,
        top: 'calc(100% - 90px)',
      }}
      ref={sheet}
      className={`flex flex-col justify-center items-center fixed bottom-0 left-0 rounded-t-3xl bg-white z-1 w-full border-t-2 px-4 pt-5 shadow-2xl border-neutral-200 `}
    >
      <BottomSheetHeader />
      <div
        className="h-full w-full  overflow-auto smooth-scroll"
        ref={content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full z-10">{children}</div>
      </div>
    </section>
  );
};

export default MapBottomSheet;
