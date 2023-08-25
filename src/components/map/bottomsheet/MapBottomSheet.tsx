'use client';
import { useEffect, useState } from 'react';
import BottomSheetHeader from './BottomSheetHeader';
import { useBottomSheet } from '@/hooks/useBottomSheet';

interface MapBottomSheetProps {
  children: React.ReactNode;
  fixed?: boolean;
}
const MapBottomSheet = ({ children, fixed }: MapBottomSheetProps) => {
  const [sheetHeight, setSheetHeight] = useState<number>(0);

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
        height: `${fixed ? `calc(100% - 200px)` : sheetHeight}px`,
        top: `${fixed ? `calc(100% - 200px)` : `calc(100% - 170px)`}`,
      }}
      ref={fixed ? null : sheet}
      className={`z-10 max-w-md flex flex-col justify-center items-center fixed bottom-0 rounded-t-3xl bg-white w-full border-t-2 px-2 pt-3 shadow-2xl border-neutral-200 `}
    >
      <BottomSheetHeader />
      <div className="h-full w-full overflow-auto scrollbar-hide" ref={content}>
        <div className="flex flex-col w-full h-full">{children}</div>
      </div>
    </section>
  );
};

export default MapBottomSheet;
