'use client';
import { Alert } from '@/utils/Icon';
import Icons from '../common/Icons';
import { toast } from 'react-hot-toast';
import useSWR from 'swr';
import { useSetRecoilState } from 'recoil';
import { bottomSheetState } from '@/recoil/bottomsheet';
import { useRouter } from 'next-nprogress-bar';
import { TrueAlertIcon } from '../profile/editpage/EditImageIcon';
import { usePathname } from 'next/navigation';
import { userClientVerify } from '@/service/user';

interface AlertButtonComponentProps {
  link: string;
  type?: 'community' | 'home' | 'profile';
}

const AlertButtonComponent = ({
  link,
  type = 'home',
}: AlertButtonComponentProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: ActiveData, error } = useSWR<ResponseAlarm>(
    `/api/alert/activity`,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      keepPreviousData: true,
    },
  );
  const hasUnreadAlarm = ActiveData?.alarmList.some((item) => !item.isRead);
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
    if (response && response.status === 200) {
      router.refresh();
      router.push(link);
    } else {
      router.refresh();
      toast.error('로그인이 필요합니다.', { position: 'top-center' });
      openLoginBottomSheet();
    }
  };

  return (
    <div
      onClick={handleWritePostClick}
      className="selection:bg-none cursor-pointer"
    >
      {hasUnreadAlarm ? (
        <Icons path={Alert}>
          <TrueAlertIcon type={type} />
        </Icons>
      ) : (
        <Icons
          path={Alert}
          fill="none"
          option={{
            stroke: type === 'community' ? 'black' : 'white',
            strokeWidth: '1.5',
            strokeLinecap: 'round',
          }}
        />
      )}
    </div>
  );
};
export default AlertButtonComponent;
