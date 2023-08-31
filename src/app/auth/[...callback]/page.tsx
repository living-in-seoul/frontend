'use client';

import { signupState } from '@/recoil/authStates';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
interface Req {
  searchParams: {
    state: string;
    code: string;
    scope: string;
  };
}
const CallbackPage = (req: Req) => {
  const setSignupData = useSetRecoilState(signupState);
  const router = useRouter();
  const { searchParams } = req;
  const { code, state } = searchParams;
  console.log('aaaaaaaaaaaaaa', code, state);

  useEffect(() => {
    try {
      console.log('aaaaaaaaaaaaaa');
      const response = fetch('/api/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, state }),
      }).then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          return router.push('/signup/second');
        } else if (response.status === 415) {
          return router.push('/signin');
        }
      });
      console.log(response);
    } catch {
      throw new Error();
    }
  }, []);
  return <div></div>;
};

export default CallbackPage;

// 1 회원이 정보가 없을 때
// 페이지로 들어오게 되면 서버랑 통신을해서 db에 회원 저장 소셜기반 email을 전 받아요
// 토큰 받고 추가정보페이지로 넘어가면
// 다 기입하고 if문으로 소셜로그인인지 그냥로그인인지 파악해서 소셜로그인일경우
// redirect로 설정해야함 api에서 bff로넘어오면 setcookie response
// use client로 될 것같아서 req.cookie xx api로 넘어가서 bff
// response email 2차인증때 토큰하는게 아니라 email parmas 가입하고있는 유저를 식별할
// 미들웨어에서 넘어기지않는다 signup token이 있으면
