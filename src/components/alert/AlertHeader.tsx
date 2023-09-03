'use client';
import { SearchBack } from '@/utils/Icon';
import Icons from '../common/Icons';
import { usePathname, useRouter } from 'next/navigation';
import { SettingIcon } from '../profile/editpage/EditImageIcon';

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

  return (
    <div className="flex w-full justify-between items-center px-2.5 h-12 gap-3">
      <div className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 active:bg-sky-200 transition-all duration-500">
        <Icons
          path={SearchBack}
          fill="none"
          option={{
            fill: '#404040',
          }}
          className="cursor-pointer"
          onClick={() => router.back()}
        />
      </div>
      <div className="grow text-black text-base font-semibold leading-relaxed">
        {Title()}
      </div>
      {Title() === '알림' && (
        <div className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 active:bg-sky-200 transition-all duration-500">
          <Icons
            path={{ width: 0, height: 0, path: '' }}
            className="cursor-pointer"
            onClick={() => router.push('/alert/setting')}
          >
            <SettingIcon />
          </Icons>
        </div>
      )}
    </div>
  );
};
export default AlertHeader;
