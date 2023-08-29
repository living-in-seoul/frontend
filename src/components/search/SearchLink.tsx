'use client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
  const router = useRouter();
  const searchParams = useSearchParams().get('search') || '';
  const link = category.link
    ? `/search?search=${encodeURIComponent(searchParams)}&category=${
        category.link
      }`
    : `/search?search=${encodeURIComponent(searchParams)}`;

  const isActive = category.link
    ? `${category.link}` === pathname.split('/')[2]
    : pathname.split('/')[2] === 'All' || pathname === '/search';

  return (
    <div
      onClick={() => router.replace(link)}
      style={{ fontWeight: isActive ? 'bold' : 'normal' }}
      className={`relative w-1/4 flex items-center justify-center py-4`}
    >
      {children}
    </div>
  );
}
