import { redirect } from 'next/navigation';

export async function oauthHandler(url: string) {
  redirect(url);
}

export const oauthSignin = async (data: RequestOauthLogin) => {
  await fetch(`${process.env.NEXT_PUBLIC_SERVER}/auth/oauth/login`, {
    method: 'POST',
    body: JSON.stringify(data),
  }).then((response) => response.json());
};
