'use client';
import { LINK_NAME, SEARCH_LINK_NAME } from '@/utils/constants/board';
import NavLink from './CommunityLink';
import { useSearchParams } from 'next/navigation';
import SearchLink from '../search/SearchLink';

const CommunityNavbar = ({ search = false }: { search?: boolean }) => {
  const params = useSearchParams();
  const pathname = params.get('category');

  // const pathname = usePathname();
  const navBarBottomBar = () => {
    switch (pathname) {
      case null:
        return 'left-4';
      case 'review':
        return 'left-[calc(25%+0.5rem)]';
      case 'communication':
        return 'left-1/2';
      case 'Life':
        return 'left-[calc(75%-0.5rem)]';
      default:
        return 'left-0/4';
    }
  };
  const leftPosition = navBarBottomBar() ?? 'left-0';
  return (
    <nav className="relative w-full flex px-4 box-border">
      <div
        className={`w-[calc(25%-8px)] absolute ${leftPosition} bottom-0 border-b-4 h-1 border-neutral-500 transition-all ease-out`}
      />
      {search
        ? SEARCH_LINK_NAME.map((item) => (
            <SearchLink key={item.link} category={item}>
              {item.name}
            </SearchLink>
          ))
        : LINK_NAME.map((category) => (
            <NavLink key={category.link} category={category}>
              {category.name}
            </NavLink>
          ))}
    </nav>
  );
};
export default CommunityNavbar;
