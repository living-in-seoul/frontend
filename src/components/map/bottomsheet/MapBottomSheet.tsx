'use client';

import { useEffect, useState } from 'react';
import BottomSheetHeader from './BottomSheetHeader';

interface MapBottomSheetProps {
  children: React.ReactNode;
}

const MapBottomSheet = ({ children }: MapBottomSheetProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [sheetHeight, setSheetHeight] = useState<number>(130);

  useEffect(() => {
    if (open) {
      setSheetHeight(window.innerHeight - 200);
    } else {
      setSheetHeight(130);
    }
  }, [open, sheetHeight]);

  const onToggleSheet = () => {
    setOpen(!open);
  };

  return (
    <section
      style={{
        transform: `translateY(-${sheetHeight})`,
        transition: 'all 0.2s ease',
        height: `${sheetHeight}px`,
      }}
      onClick={onToggleSheet}
      // onTouchEnd={(e) => console.log(e)}
      draggable="true"
      onTouchMove={(e) => console.log(e)}
      className={`flex flex-col justify-center items-center fixed bottom-0 left-0 rounded-t-3xl bg-white z-1 w-full border-t-2 px-4 pt-5 shadow-2xl border-neutral-200 `}
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
