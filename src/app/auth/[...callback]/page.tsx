'use client';

import { oauthSignin } from '@/service/oauth';
import { useSearchParams } from 'next/navigation';
import { NextRequest } from 'next/server';
import { useEffect } from 'react';
// import type { NextApiRequest, NextApiResponse } from 'next';
// interface Req extends NextApiRequest {
//   searchParams: {
//     state: string;
//     code: string;

//     scope: string;
//   };
// }
// const Callback = async (
//   req: Req,
//   res: NextApiResponse,
// ): Promise<ResponseOauthLogin> => {
//   const { searchParams } = req;
//   const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}`, {
//     method: 'POST',
//     body: JSON.stringify({ code: searchParams.code }),
//   }).then((response) => response.json());
//   return response.data;
// };

// export default Callback;

const AuthPage = (req: NextRequest) => {
  // const fetchtest = async () => {
  //   await fetch('/api/callbacks', {method: 'POST',
  //           body: JSON.stringify({ code }),} )
  // }

  const pathName = req.nextUrl;
  console.log(pathName);
  const params = useSearchParams();
  const code = params.get('code');
  const state = params.get('state');

  useEffect(() => {
    const socialLoginFetch = async () => {
      await fetch(`/api/callback`, {
        method: 'POST',
        body: JSON.stringify({ code }),
      }).then((response) => response.json());
    };
    socialLoginFetch();
  }, []);
  // console.log(code, state);
  return <div>page</div>;
};

export default AuthPage;
