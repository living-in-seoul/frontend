'use client';
import Link from 'next/link';
import Icons from '../common/Icons';
import { usePathname } from 'next/navigation';
import { MypageIcon, ProfileIcon } from '../profile/editpage/EditImageIcon';
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
  {
    name: '마이페이지',
    path: '/mypage/scrapped',
    iconElement: <MypageIcon type="none" />,
    iconfilledElement: <MypageIcon type="fill" />,
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const MainPathName = '/' + pathname.split('/')[1];
  return (
    <nav className="fixed bottom-0 right-auto max-w-md w-full border-t bg-white">
      <div className="flex-row h-[76px] flex w-full justify-center px-4 pt-2">
        {NavBarArray.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="group scale-100 transition-all active:scale-110 basis-1/5 justify-center items-center flex flex-col gap-[5px]"
          >
            {item.iconPath ? (
              <Icons
                path={item.iconPath}
                fill={MainPathName === item.path ? '#2DDAB0' : '#B8B8B8'}
                className=""
              />
            ) : (
              <Icons
                path={map}
                fill={MainPathName === item.path ? '#2DDAB0' : '#B8B8B8'}
                className=""
              >
                {MainPathName === item.path
                  ? item.iconfilledElement
                  : item.iconElement}
              </Icons>
            )}
            <div
              className={`text-center ${
                MainPathName === item.path ? 'text-primary' : 'text-gray5'
              } text-xs font-normal leading-3`}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
