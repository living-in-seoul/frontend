'use client';

import Icons from '@/components/common/Icons';
import { close } from '@/utils/Icon';
import { useRouter } from 'next/navigation';

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const route = useRouter();

  return (
    <main className="px-4 pt-5 pb-12 flex flex-col justify-between">
      <div className="mb-16 w-full h-full">
        <Icons path={close} fill="#404040" onClick={() => route.back()} />
      </div>
      {children}
    </main>
  );
}
