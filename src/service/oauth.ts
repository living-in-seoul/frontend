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
