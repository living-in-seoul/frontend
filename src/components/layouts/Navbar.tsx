'use client';
import Link from 'next/link';
import Icons from '../common/Icons';
import { usePathname, useRouter } from 'next/navigation';
import { MypageIcon, ProfileIcon } from '../profile/editpage/EditImageIcon';
import { comunity, home, map } from '@/utils/Icon';
import { useSetRecoilState } from 'recoil';
import { bottomSheetState } from '@/recoil/bottomsheet';
import { userClientVerify } from '@/service/oauth';
import { toast } from 'react-hot-toast';

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
    path: '/mypage',
    iconElement: <MypageIcon type="none" />,
    iconfilledElement: <MypageIcon type="fill" />,
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const MainPathName = '/' + pathname?.split('/')[1];
  const router = useRouter();
  const setBottomSheetState = useSetRecoilState(bottomSheetState);
  const openLoginBottomSheet = () => {
    setBottomSheetState({
      isActive: true,
      type: 'login',
      link: null,
    });
  };

  const handleMyPageClick = async (link: string) => {
    const response = await userClientVerify();
    if (response && response.status === 200) {
      router.refresh();
      router.push(link);
    } else {
      toast.error('로그인이 필요합니다.', { position: 'top-center' });
      openLoginBottomSheet();
    }
  };
  return (
    <nav className="fixed bottom-0 right-auto max-w-md w-full border-t bg-white">
      <div className="flex-row h-[76px] flex w-full justify-center px-4 pt-2">
        {NavBarArray.map((item) => {
          if (!item.iconPath) {
            return (
              <div
                key={item.name}
                // href={item.path}
                onClick={() => handleMyPageClick(item.path)}
                className="group scale-100 transition-all active:scale-110 basis-1/5 justify-center items-center flex flex-col gap-[5px] cursor-pointer"
              >
                <Icons
                  path={map}
                  fill={MainPathName === item.path ? '#2DDAB0' : '#B8B8B8'}
                  className=""
                >
                  {MainPathName === item.path
                    ? item.iconfilledElement
                    : item.iconElement}
                </Icons>
                <div
                  className={`text-center ${
                    MainPathName === item.path ? 'text-primary' : 'text-gray5'
                  } text-xs font-normal leading-3`}
                >
                  {item.name}
                </div>
              </div>
            );
          }

          return (
            <Link
              prefetch
              key={item.name}
              href={item.path}
              className="group scale-100 transition-all active:scale-110 basis-1/5 justify-center items-center flex flex-col gap-[5px]"
            >
              <Icons
                path={item.iconPath}
                fill={MainPathName === item.path ? '#2DDAB0' : '#B8B8B8'}
                className=""
              />
              <div
                className={`text-center ${
                  MainPathName === item.path ? 'text-primary' : 'text-gray5'
                } text-xs font-normal leading-3`}
              >
                {item.name}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;

{
  /* <IsAuthBottomSheet link={item.path} key={item.name}>
                <div className="group scale-100 transition-all active:scale-110 basis-1/5 justify-center items-center flex flex-col gap-[5px]">
                  <Icons
                    path={map}
                    fill={MainPathName === item.path ? '#2DDAB0' : '#B8B8B8'}
                    className=""
                  >
                    {MainPathName === item.path
                      ? item.iconfilledElement
                      : item.iconElement}
                  </Icons>
                  <div
                    className={`text-center ${
                      MainPathName === item.path ? 'text-primary' : 'text-gray5'
                    } text-xs font-normal leading-3`}
                  >
                    {item.name}
                  </div>
                </div>
              </IsAuthBottomSheet> */
}
