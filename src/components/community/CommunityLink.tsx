'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function NavLink({
  category,
  children,
}: {
  category: {
    link: string | null;
    name: string;
  };
  children: React.ReactNode;
}) {
  const params = useSearchParams();
  const pathname = usePathname();
  const link = category.link
    ? `/community?category=${category.link}`
    : '/community';

  const isActive = category.link
    ? `${category.link}` === params.get('category')
    : params.get('category') === null || pathname === '/';

  return (
    <Link
      href={link}
      style={{
        fontWeight: isActive ? 'bold' : 'normal',
        color: isActive ? '#2DDAB0' : '#787878',
      }}
      className={`isrelative w-1/4 flex items-center justify-center py-4`}
    >
      {children}
    </Link>
  );
}
