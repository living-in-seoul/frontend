'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function MypageLink({
  category,
  children,
}: {
  category: {
    params: string | null;
    name: string;
  };
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? '';
  const param = useSearchParams();
  const categoryParam = param?.get('category');
  const link = category.params
    ? `/mypage?category=${category.params}`
    : '/mypage';

  const isActive = category.params
    ? `${category.params}` === categoryParam
    : pathname.split('/')[2] === 'selceted' || pathname === '/mypage';
  return (
    <Link
      href={link}
      style={{ fontWeight: isActive ? 'bold' : 'normal' }}
      className={`grow flex items-center justify-center py-4 ${
        isActive && 'border-b-4 border-teal-400 text-teal-400'
      }`}
    >
      {children}
      &nbsp;
      <span className="text-neutral-500 font-normal"></span>
    </Link>
  );
}
