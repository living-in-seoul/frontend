import { redirect } from 'next/navigation';
import axios from 'axios';

interface ResponseDataType {
  message: string;
  code: number;
}

/**회원가입 시 */
export const postSignup = async (data: RequestRegister) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER}/auth/signup`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError<ResponseDataType>(error)) {
      error.response?.data.message;
      error.response?.data.code;
    }
  }
};

/**로그인 시 */
export const postSingin = async (data: RequestLogin) => {
  try {
    const response = await axios.post('/auth/login', data);
    console.log('뭐야 이게 뒤통수 존나 아파', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export async function oauthHandler(url: string) {
  redirect(url);
}

export const oauthSignin = async (data: RequestOauthLogin) => {
  await fetch(`${process.env.NEXT_PUBLIC_SERVER}/auth/oauth/login`, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then((response) => response.json());
};
