'use client';
import { SearchBack } from '@/utils/Icon';
import Icons from '../common/Icons';
import { usePathname, useRouter } from 'next/navigation';
import { SettingIcon } from '../profile/editpage/EditImageIcon';
import Header from '../layouts/Header';
import Back from '../common/Back';

const AlertHeader = () => {
  const pathname = usePathname();
  const router = useRouter();

  const Title = () => {
    switch (pathname) {
      case '/alert':
        return '알림';
      case '/alert/setting':
        return '알림설정';
      case '/alert/hashtag':
        return '해시태그 알림 등록';

      default:
        return;
    }
  };
  const RightContent = () => (
    <div className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 active:bg-sky-200 transition-all duration-500">
      <Icons
        path={{ width: 0, height: 0, path: '' }}
        className="cursor-pointer"
        onClick={() => router.push('/alert/setting')}
      >
        <SettingIcon />
      </Icons>
    </div>
  );

  return (
    <Header
      left={<Back />}
      right={Title() === '알림' ? <RightContent /> : <></>}
      center={
        <div className="grow text-black text-base font-semibold leading-relaxed">
          {Title()}
        </div>
      }
    />
  );
};
export default AlertHeader;
