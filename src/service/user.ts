import { redirect } from 'next/navigation';
import { instance } from './instance';
import { cookies } from 'next/headers';
import { getRefreshToken } from './token';

/** 회원가입 필수사항 시 */
export const postSignup = async (data: RequestEssentialRegister) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/auth/signup1`,
    {
      method: 'POST',
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
/** 회원가입 선택사항 시 */
export const putSignup = async (data: RequestNonessentialRegister) => {
  const { email } = data;
  delete data.email;
  console.log(email);
  console.log(data);
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
  const { code, state } = data;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/auth/login/${state}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ code }),
      },
    )
      .then((response) => response.json())
      .catch((error) => error.response);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error();
  }
};

/** 프로필 정보 가져오기 */
export const getProfile = async () => {
  const token = cookies().get('accessToken')?.value;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/auth/profile`,
    {
      headers: { authorization: 'Bearer ' + token },
      next: { revalidate: 0 },
    },
  )
    .then<ResponseUserProfileData>((response) => response.json())
    .catch((error) => error.response);
  return response;
};

/**토큰 있는지만 검사 */
export const verifyUser = async () => {
  const token = cookies().get('accessToken')?.value;
  if (token) {
    return true;
  }
};

export const putProfile = async (data: any) => {
  const token = cookies().get('accessToken');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/auth/update`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: 'Bearer ' + token?.value,
      },
    },
  )
    .then((response) => response.json())
    .catch((error) => error.response);

  return response;
};

export const putProfileImage = async (data: any) => {
  const token = cookies().get('accessToken');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/auth/update`,
    {
      method: 'PUT',
      body: data,
      headers: {
        enctype: 'multipart/form-data',
        authorization: 'Bearer ' + token?.value,
      },
    },
  )
    .then((response) => response.json())
    .catch((error) => error.response);

  return response;
};
