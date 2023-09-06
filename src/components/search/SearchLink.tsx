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
  const router = useRouter();
  const searchParams = useSearchParams()?.get('search') || '';
  const getCategory = useSearchParams()?.get('category') || null;
  const link = category.link
    ? `/search?search=${encodeURIComponent(searchParams)}&category=${
        category.link
      }`
    : `/search?search=${encodeURIComponent(searchParams)}`;

  const isActive = category.link === getCategory;

  return (
    <div
      onClick={() => router.replace(link)}
      className={`relative w-1/4 flex items-center justify-center py-4 ${
        isActive && 'text-primary'
      }`}
    >
      {children}
    </div>
  );
}
