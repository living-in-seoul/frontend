'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function NavLink({
  category,
  children,
  onMypage = false,
}: {
  category: {
    link: string | null;
    name: string;
  };
  children: React.ReactNode;
  onMypage?: boolean;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const slug = onMypage ? 'mypage' : 'community';

  const link = category.link
    ? `/${slug}?category=${category.link}`
    : `/${slug}`;

  const isCommunityActive = category.link
    ? `${category.link}` === params?.get('category')
    : params?.get('category') === null || pathname === '/';
  const isMypageActive = category.link
    ? `${category.link}` === params?.get('category')
    : params?.get('category') === 'myscrap' || pathname === '/';
  const isActive = onMypage ? isMypageActive : isCommunityActive;

  const paramsRouteHandle = (item: { link: string | null; name: string }) => {
    const searchParams = new URLSearchParams(params);
    // searchParams.set('category',);
    router.replace(`${pathname}?category=${item.link || ''}`);
  };

  return (
    <div
      onClick={() => paramsRouteHandle(category)}
      style={{
        fontWeight: isActive ? 'bold' : 'normal',
        color: isActive ? '#2DDAB0' : '#787878',
      }}
      className={`isrelative ${
        slug === 'mypage' ? 'w-1/2' : 'w-1/4'
      } flex items-center justify-center py-4 cursor-pointer`}
    >
      {children}
    </div>
  );
}
