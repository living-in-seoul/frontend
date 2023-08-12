'use client';

import SignupWelcome from '@/components/auth/signup/SignupWelcome';
import Icons from '@/components/common/Icons';
import { back } from '@/utils/Icon';
import { useRouter } from 'next/navigation';
import { RecoilRoot } from 'recoil';

export default function NoNavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <main className="px-4 pt-5 pb-12 flex flex-col justify-between">
      <RecoilRoot>
        <div className="mb-16 w-full h-full" onClick={() => router.back()}>
          <Icons path={back} fill="#404040" />
        </div>
        <SignupWelcome />

        {children}
      </RecoilRoot>
    </main>
  );
}
