'use client';

import { signupState } from '@/recoil/authStates';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const AuthPage = (req: any) => {
  const pathName = req.nextUrl;
  console.log(pathName);
  const params = useSearchParams();
  const code = params.get('code');
  useEffect(() => {
    const socialLoginFetch = async () => {
      await fetch(`/api/callback`, {
        method: 'POST',
        body: JSON.stringify({ code }),
      }).then((response) => response.json());
    };
    socialLoginFetch();
  }, []);
  return <div></div>;
};

export default AuthPage;
