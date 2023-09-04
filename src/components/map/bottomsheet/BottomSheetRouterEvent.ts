'use client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { bottomSheetState } from '@/recoil/bottomsheet';

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const setBottomSheetState = useSetRecoilState(bottomSheetState);

  useEffect(() => {
    setBottomSheetState({
      isActive: false,
      type: 'default',
      link: null,
    });
  }, [pathname, searchParams, setBottomSheetState]);

  return null;
}
