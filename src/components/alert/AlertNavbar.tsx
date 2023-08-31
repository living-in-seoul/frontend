'use client';

import { AleatSectionState } from '@/recoil/authStates';
import { useRecoilState } from 'recoil';

const AlertNavbar = () => {
  const [alertCurrentSectionState, setAlertSectionState] =
    useRecoilState(AleatSectionState);
  const navBarBottomBar = () => {
    switch (alertCurrentSectionState) {
      case 'active':
        return 'left-0';
      case 'hastag':
        return 'left-1/2';
      default:
        return 'left-0/4';
    }
  };
  const leftPosition = navBarBottomBar() ?? 'left-0';
  return (
    <nav className="relative w-full flex box-border">
      <div
        className={`w-[calc(50%)] absolute ${leftPosition} bottom-0 border-b-4 h-1 border-neutral-500 transition-all ease-out`}
      />
      <div className="flex w-full">
        <button
          onClick={() => setAlertSectionState('active')}
          className={`grow text-center text-black text-sm ${
            alertCurrentSectionState === 'active' && 'font-semibold'
          } leading-none relative w-1/4 flex items-center justify-center py-5`}
        >
          활동 알림
        </button>
        <button
          onClick={() => setAlertSectionState('hastag')}
          className={`grow text-center text-black text-sm ${
            alertCurrentSectionState === 'hastag' && 'font-semibold'
          } leading-none relative w-1/4 flex items-center justify-center py-5`}
        >
          해시태그 알림
        </button>
      </div>
    </nav>
  );
};
export default AlertNavbar;
