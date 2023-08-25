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

/** 소셜로그인 토큰 발급시 */
// export const oauthGetToken = async (data: RequestOauthLogin) => {
//   const code = data;
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_KAKAO_GET_TOKEN_URL}grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&code=${code}`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/x-www-form-urlencoded',
//       },
//     },
//   )
//     .then((response) => response.json())
//     .catch((error) => error.response);
//   return response;
// };
