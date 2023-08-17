'use client';
import SigninButtons from '@/components/auth/signin/SigninButtons';
import SigninWelcome from '@/components/auth/signin/SigninWelcome';
import { callbackUrlState } from '@/recoil/authStates';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

interface SigninProps {
  searchParams: {
    callbackUrl: string;
  };
}

const SignIpPage = ({ searchParams: { callbackUrl } }: SigninProps) => {
  const setCallbackUrl = useSetRecoilState(callbackUrlState);
  useEffect(() => {
    setCallbackUrl(callbackUrl);
  });

  return (
    <section className="flex flex-col ">
      <SigninWelcome />
      <div className="mt-44 w-full h-10 relative flex items-center justify-center">
        <span className="bg-white z-10 px-3 text-zinc-400">
          SNS로 간편하게 로그인하세요
        </span>
        <div className="absolute top-0 w-full h-5 border-b border-b-zinc-400 " />
      </div>
      <SigninButtons />
    </section>
  );
};
export default SignIpPage;
