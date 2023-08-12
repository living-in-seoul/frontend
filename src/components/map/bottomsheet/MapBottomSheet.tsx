'use client';

import { useEffect, useState } from 'react';
import BottomSheetHeader from './BottomSheetHeader';
import { usePathname } from 'next/navigation';

interface MapBottomSheetProps {
  children: React.ReactNode;
}

const MapBottomSheet = ({ children }: MapBottomSheetProps) => {
  const router = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const [sheetHeight, setSheetHeight] = useState<number>(200);

  useEffect(() => {
    if (open) {
      setSheetHeight(window.innerHeight - 200);
    } else {
      setSheetHeight(200);
    }
  }, [open, sheetHeight]);
  const onToggleSheet = () => {
    setOpen(!open);
  };

  return (
    <section
      style={{
        transform: `translateY(-${sheetHeight})`,
        transition: 'all 0.5s ease-in-out',
        height: `${sheetHeight}px`,
      }}
      onClick={onToggleSheet}
      className={`flex flex-col justify-center items-center fixed bottom-0 left-0 rounded-t-3xl bg-slate-50 z-1 w-full border-t-2 p-5 shadow-2xl ease-out`}
    >
      <BottomSheetHeader />
      <div
        className="h-full w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col overflow-auto h-full smooth-scroll z-10">
          {children}
        </div>
      </div>
    </section>
  );
};

export default MapBottomSheet;
