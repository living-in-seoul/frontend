'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MypageLink({
  category,
  children,
}: {
  category: {
    link: string | null;
    name: string;
  };
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const link = category.link ? `/mypage/${category.link}` : '/mypage';

  const isActive = category.link
    ? `${category.link}` === pathname.split('/')[2]
    : pathname.split('/')[2] === 'selceted' || pathname === '/mypage';
  return (
    <Link
      href={link}
      style={{ fontWeight: isActive ? 'bold' : 'normal' }}
      className={`grow flex items-center justify-center py-4 ${
        isActive && 'border-b-4 border-neutral-500'
      }`}
    >
      {children}
      &nbsp;
      <span className="text-neutral-500 font-normal">30</span>
    </Link>
  );
}
