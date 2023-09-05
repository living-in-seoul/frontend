import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { verifyAndRefreshToken } from './token';

/** 회원가입 필수사항 시 */
export const postSignup = async (data: RequestEssentialRegister) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/auth/signup`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  );
  if (!response.ok) {
    throw {
      status: response.status,
      statusText: response.statusText,
      message: `Error ${response.status}: ${response.statusText}`,
    };
  }
  return response.json();
};

/**회원정보 수정 */
export const putSignup = async (data: RequestPutProfile) => {
  const token = cookies().get('accessToken');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/user/update`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token?.value,
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
      `${process.env.NEXT_PUBLIC_SERVER}/social/login/${state}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ authCode: code }),
      },
    ).then<ResponseOauthLogin>((response) => response.json());
    return response;
  } catch (error) {
    throw new Error();
  }
};

/** 프로필 정보 가져오기 */
export const getProfile = async () => {
  const token = cookies().get('accessToken')?.value;
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/profile/me`, {
    headers: { authorization: 'Bearer ' + token },
    next: { revalidate: 0 },
  })
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

/**프로필이미지 수정 */
export const putProfileImage = async (data: FormData) => {
  const token = cookies().get('accessToken');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/profile/update`,
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

/**회원탈퇴 */
export const deleteUser = async () => {
  const token = cookies().get('accessToken');
  const refreshToken = cookies().get('refreshToken');
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/user/delete`,
    {
      method: 'DELETE',
      headers: {
        authorization: 'Bearer ' + token?.value,
      },
    },
  )
    .then((response) => response.json())
    .then((response) => {
      if (token || refreshToken) {
        cookies().delete('accessToken');
        cookies().delete('refreshToken');
        return response;
      }
    })
    .catch((error) => error.response);

  return response;
};
