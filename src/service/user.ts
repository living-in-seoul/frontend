import { redirect } from 'next/navigation';
import { instance } from './instance';

/**회원가입 시 */
export const postSignup = async (data: RequestRegister) => {
  const response = await instance
    .post(`/auth/signup`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
  return response;
};

/**로그인 시 */
export const postSingin = async (data: RequestLogin) => {
  const response = await instance
    .post(`/auth/login`, data)
    .then((response) => response.data)
    .catch((error) => error.response);
  return response;
};

export async function oauthHandler(url: string) {
  redirect(url);
}
/**소셜로그인 시 */
export const oauthSignin = async (data: RequestOauthLogin) => {
  await fetch(`${process.env.NEXT_PUBLIC_SERVER}/auth/oauth/login`, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then((response) => response.json());
};
