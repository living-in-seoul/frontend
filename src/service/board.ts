// 데이터 정해지면 type 바꿔라 꼭 잊지말고

import { cookies } from 'next/headers';

interface ResponseDataType {
  message: string;
  code: number;
}

/**글쓰기 post */
export const writeBoard = async (form: any) => {
  const token = cookies().get('accessToken');
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/posts`, {
      method: 'POST',
      headers: {
        enctype: 'multipart/form-data',
        authorization: 'Bearer ' + token?.value,
      },
      body: form,
    }).then((response) => response.json());
    return response;
  } catch (error: any) {
    console.log('ehlsmsdfasdfa', error.message);
  }
};
