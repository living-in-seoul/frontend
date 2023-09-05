'use server';

import { verifyAndRefreshToken } from '@/service/token';
import { cookies } from 'next/headers';

// export const handleHashTagSubmit = async (formData: FormData) => {
//   const hashtag = formData.get('hashtag') as string;
//   console.log(hashtag);
//   const body = {
//     hashtag: 'hashtag',
//   };
//   const verify = await verifyAndRefreshToken();
//   if (verify.status === 201) {
//     // console.log('토근');
//   }
//   if (verify.status === 403) {
//     // console.log('토큰');
//   }
//   const Token = cookies().get('accessToken')?.value;
//   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/alarm/hashtag`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${Token}`,
//     },
//     body: JSON.stringify(body),
//   }).then((res) => res.json());
//   console.log(res);
//   return res;
// };
