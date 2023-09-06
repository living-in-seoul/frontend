'use client';
import NavLink from '@/components/community/CommunityLink';
import { MYPAGE_LINK_NAME } from '@/utils/constants/board';
import { usePathname, useSearchParams } from 'next/navigation';

export default function MypageLink() {
  const param = useSearchParams();
  const pathname = param?.get('category');
  const navBarBottomBar = () => {
    switch (pathname) {
      case 'myscrap':
        return 'left-0';
      case 'mypost':
        return 'left-[calc(50%)]';
    }
  };

  const leftPosition = navBarBottomBar() ?? 'left-0';
  return (
    <nav className={`relative w-full flex px-4 box-border`}>
      <div
        className={`${leftPosition} w-[calc(50%-8px)] absolute  bottom-0 border-b-4 h-1 border-primary transition-all ease-out`}
      />
      {MYPAGE_LINK_NAME.map((category) => (
        <NavLink key={category.link} category={category} onMypage={true}>
          {category.name}
        </NavLink>
      ))}
    </nav>
  );
}
