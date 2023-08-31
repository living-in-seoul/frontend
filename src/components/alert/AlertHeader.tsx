'use client';
import { SearchBack } from '@/utils/Icon';
import Icons from '../common/Icons';
import { usePathname, useRouter } from 'next/navigation';
import { SettingIcon } from '../profile/editpage/EditImageIcon';

const AlertHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const alert = pathname === '/alert';
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
        {alert ? '알림' : '알림설정'}
      </div>
      {alert && (
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
