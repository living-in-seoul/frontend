'use client';
import Link from 'next/link';
import Icons from '../common/Icons';
import { usePathname } from 'next/navigation';
import { ProfileIcon } from '../profile/editpage/EditImageIcon';
import { comunity, home, map } from '@/utils/Icon';

const NavBarArray = [
  {
    name: '홈',
    path: '/home',
    iconPath: home,
    iconFillPath: home,
  },
  {
    name: '커뮤니티',
    path: '/community',
    iconPath: comunity,
  },
  {
    name: '지도',
    path: '/map',
    iconPath: map,
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const MainPathName = '/' + pathname.split('/')[1];
  return (
    <nav className="fixed bottom-0 right-auto max-w-md w-full border-t bg-white">
      <div className="flex-row h-[60px] flex w-full justify-center px-4 pt-2">
        {NavBarArray.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="group scale-100 transition-all active:scale-110 basis-1/5 justify-center items-center flex flex-col gap-1"
          >
            <Icons
              path={item.iconPath}
              fill={MainPathName === item.path ? '#000' : '#636363'}
              className=""
            />
            <div className="text-center text-black text-xs font-normal leading-3">
              {item.name}
            </div>
          </Link>
        ))}
        <Link
          href={'/mypage/scrapped'}
          className="basis-1/5 justify-center items-center flex flex-col gap-1"
        >
          <MypageIcon />
          <div className="text-center text-black text-xs font-normal leading-3">
            마이페이지
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
