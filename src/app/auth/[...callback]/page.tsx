'use client';

import { signupState } from '@/recoil/authStates';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const AuthPage = () => {
  const setUserData = useSetRecoilState(signupState);
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
    // setUserData() 여기서 데이터를 셋해서 저장해놓고
    // redirect('/home') 리다이렉트를 보내는데 일단 홈으로 보내자
  }, []);
  return <div></div>;
};

export default AuthPage;
