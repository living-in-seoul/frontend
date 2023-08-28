'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SearchLink({
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
  const link = category.link ? `/search?category=${category.link}` : '/search';

  const isActive = category.link
    ? `${category.link}` === pathname.split('/')[2]
    : pathname.split('/')[2] === 'All' || pathname === '/search';

  return (
    <Link
      href={link}
      style={{ fontWeight: isActive ? 'bold' : 'normal' }}
      className={`relative w-1/4 flex items-center justify-center py-4`}
    >
      {children}
    </Link>
  );
}
