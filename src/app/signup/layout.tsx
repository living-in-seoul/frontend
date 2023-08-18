'use client';

import SignupWelcome from '@/components/auth/signup/SignupWelcome';
import Icons from '@/components/common/Icons';
import { back } from '@/utils/Icon';
import { useRouter, useSearchParams } from 'next/navigation';
import { RecoilRoot } from 'recoil';

export default function NoNavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useSearchParams();
  return (
    <main className="h-screen px-4 flex flex-col gap-10 pb-4  ">
      <RecoilRoot>
        <div className="pt-5 " onClick={() => router.back()}>
          <Icons path={back} fill="#404040" />
        </div>
        <SignupWelcome />
        {children}
      </RecoilRoot>
    </main>
  );
}
