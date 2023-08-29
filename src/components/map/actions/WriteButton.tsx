'use client';
import Icons from '@/components/common/Icons';
import { isBottomSheetState } from '@/recoil/communityStates';
import { HomeWriteIcon, write } from '@/utils/Icon';
import { useSetRecoilState } from 'recoil';

interface WriteButtonProp {
  section: 'map' | 'home';
  onClick?: () => {};
}

const WriteButton = ({ section = 'map' }: WriteButtonProp) => {
  const setWritePageModalOpen = useSetRecoilState(isBottomSheetState);

  const MapWriteButton = (
    <div className="p-2 bg-white rounded-full shadow-3xl hover:cursor-pointer">
      <Icons path={write} />
    </div>
  );
  const HomeWriteButton = (
    <div
      onClick={() => setWritePageModalOpen(true)}
      className="shadow-md active:scale-50 transition-all duration-500 fixed bottom-24 left-[calc(50%+10rem)] -translate-x-1/2 z-50 w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center cursor-pointer"
    >
      <Icons path={HomeWriteIcon} fill="none" option={{ fill: 'white' }} />
    </div>
  );
  switch (section) {
    case 'map':
      return MapWriteButton;
    case 'home':
      return HomeWriteButton;

    default:
      return;
  }
};

export default WriteButton;
