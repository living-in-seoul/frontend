import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { instance } from './instance';

/** 회원가입 필수사항 시 */
export const postSignup = async (data: RequestEssentialRegister) => {
  const response = await instance
    .post('/auth/signup1', data)
    .catch((err) => err.response);
  console.log('헤더에는 무슨 값이 담길까요?', response.headers);
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_SERVER}/auth/signup1`,
  //   {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //   },
  // )
  //   .then((response) => response.json())
  //   .catch((error) => error.response);

  return response;
};
/** 회원가입 선택사항 시 */
export const putSignup = async (data: RequestNonessentialRegister) => {
  const { email } = data;
  delete data.email;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/auth/signup2?email=${email}`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )
    .then((response) => response.json())
    .catch((error) => error.response);

  return response;
};

/** 로그인 시 */
export const postSingin = async (data: RequestLogin) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => error.response);
  return response;
};

export async function oauthHandler(url: string) {
  redirect(url);
}
/** 소셜로그인 시 */
export const oauthSignin = async (data: RequestOauthLogin) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/auth/oauth/login`,
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
  )
    .then((response) => response.json())
    .catch((error) => error.response);
  return response;
};
