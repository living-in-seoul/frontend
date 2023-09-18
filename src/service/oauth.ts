import axios from 'axios';

export const oauthSignin = async (data: RequestOauthLogin) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER}/auth/oauth/login`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const userClientVerify = async () => {
  const response = await fetch('/api/user');
  if (response.status === 200) {
    // 로그인이 확인되었을 때의 로직
  } else if (response.status === 401) {
    // 로그인이 확인되지 않았을 때의 로직
  }
  return response;
};
