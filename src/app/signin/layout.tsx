'use client';

import Icons from '@/components/common/Icons';
import { close } from '@/utils/Icon';
import { useRouter } from 'next/navigation';
import { RecoilRoot } from 'recoil';

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const route = useRouter();

  return (
    <main className="px-4 h-screen flex flex-col relative">
      <div className="pt-5 mb-16">
        <Icons path={close} fill="#404040" onClick={() => route.back()} />
      </div>
      <RecoilRoot>{children}</RecoilRoot>
    </main>
  );
}
