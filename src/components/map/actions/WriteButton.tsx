'use client';
import Icons from '@/components/common/Icons';
import { bottomSheetState } from '@/recoil/bottomsheet';
import { userClientVerify } from '@/service/user';
import { HomeWriteIcon, write } from '@/utils/Icon';
import { useRouter } from 'next-nprogress-bar';
import { toast } from 'react-hot-toast';
import { RecoilState, useSetRecoilState } from 'recoil';

interface WriteButtonProp {
  section: 'map' | 'home';
  onClick?: () => {};
  state?: RecoilState<boolean>;
}

const WriteButton = ({ section = 'map', state }: WriteButtonProp) => {
  const router = useRouter();
  const setBottomSheetState = useSetRecoilState(bottomSheetState);
  const openLoginBottomSheet = () => {
    setBottomSheetState({
      isActive: true,
      type: 'login',
      link: null,
    });
  };

  const handleWritePostClick = async (link: string) => {
    const response = await userClientVerify();
    if (response && response.status === 200) {
      router.refresh();
      router.push(link);
    } else {
      router.refresh();
      toast.error('로그인이 필요합니다.', { position: 'top-center' });
      openLoginBottomSheet();
    }
  };
  const MapWriteButton = (
    <div className="p-2 bg-white rounded-full shadow-md hover:cursor-pointer">
      <Icons path={write} />
    </div>
  );
  const HomeWriteButton = (
    <div
      onClick={() => handleWritePostClick('/write')}
      className="shadow-md active:scale-50 transition-all duration-500 fixed bottom-24 left-[calc(50%+10rem)] -translate-x-1/2 z-50 w-12 h-12 bg-primary rounded-full flex items-center justify-center cursor-pointer"
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
