'use client';
import { Alert } from '@/utils/Icon';
import Icons from '../common/Icons';
import { userClientVerify } from '@/service/oauth';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { bottomSheetState } from '@/recoil/bottomsheet';

interface AlertButtonComponentProps {
  link: string;
  type?: 'community' | 'home' | 'profile';
}

const AlertButtonComponent = ({
  link,
  type = 'home',
}: AlertButtonComponentProps) => {
  const router = useRouter();
  const setBottomSheetState = useSetRecoilState(bottomSheetState);
  const openLoginBottomSheet = () => {
    setBottomSheetState({
      isActive: true,
      type: 'login',
      link: null,
    });
  };

  const handleWritePostClick = async () => {
    const response = await userClientVerify();
    if (response && (response.status === 200 || response.status === 201)) {
      router.refresh();
      router.push(link);
    } else {
      router.refresh();
      toast.error('로그인이 필요합니다.', { position: 'top-center' });
      openLoginBottomSheet();
    }
  };

  return (
    <div onClick={handleWritePostClick} className="selection:bg-none">
      <Icons
        path={Alert}
        fill="none"
        option={{
          stroke: type === 'community' ? 'black' : 'white',
          strokeWidth: '1.5',
          strokeLinecap: 'round',
        }}
      />
    </div>
  );
};
export default AlertButtonComponent;
