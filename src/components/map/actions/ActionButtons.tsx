'use client';
import Link from 'next/link';
import CurrentLocation from './CurrentLocation';
import WriteButton from './WriteButton';
import { useRecoilValue } from 'recoil';
import { mapBottomSheetState } from '@/recoil/bottomsheet';

const ActionButtons = () => {
  const isBottomSheetOpen = useRecoilValue(mapBottomSheetState);
  return (
    <section
      className={`flex flex-col justify-between absolute ${
        isBottomSheetOpen ? `bottom-[calc(50%-2rem)]` : `bottom-20`
      }  right-5 h-28 gap-2 transition-all duration-500`}
    >
      <Link href={'/write'}>
        <WriteButton section="map" />
      </Link>
      <CurrentLocation />
    </section>
  );
};

export default ActionButtons;
