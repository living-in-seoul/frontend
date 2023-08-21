'use client';

import { signupState } from '@/recoil/authStates';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const AuthPage = () => {
  const params = useSearchParams();
  const setFirstData = useSetRecoilState(signupState);
  const code = params.get('code');

  console.log(code);
  // useEffect(() => {
  //   const socialLoginFetch = async () => {
  //     await fetch(`/api/callback`, {
  //       method: 'POST',
  //       body: JSON.stringify({ code }),
  //     }).then((response) => response.json())
  //       .then((response) => setFirstData((prev) => ({ ...prev, ...response.result }));
  //   };
  //   socialLoginFetch();
  // response로 이메일, 닉네임, 프로필사진 받고 recoil에 상태저장하고 router로
  // signupsecond로 넘김
  // });
  return <div></div>;
};

export default AuthPage;
