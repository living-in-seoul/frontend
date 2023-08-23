import axios from 'axios';
import { cookies } from 'next/headers';

export const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER}`,
});

instance.interceptors.request.use(
  (config) => {
    const cookiesStorage = cookies();
    const token = cookiesStorage.get('accessToken');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token.value;
    }
    return config;
  },
  (error) => {
    if (error.status == 403) {
    }
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    const cookiesStorage = cookies();
    const refreshToken = cookiesStorage.get('refreshToken');
    const accessToken = cookiesStorage.get('accessToken');

    if (!refreshToken && !accessToken) {
      return '토큰이 둘 다 없으니깐 로그인 페이지로 보내란 신호';
    }
    // 411은 엑세스토큰이 만료되었다는 신호
    if (error.status == 411) {
      if (refreshToken) {
        const response = fetch(
          `${process.env.NEXT_PUBLIC_SERVER}/auth/refresh`,
          {
            headers: { Authorization: 'Bearer ' + refreshToken },
          },
        ).then((response) => response.json());
      }
    }
    return Promise.reject(error);
  },
);

// const checkToken = async (req: NextRequest, res: NextRequest) => {
//   const accessToken =
//     req.headers.get('authorization') || req.cookies.get('accessToken');
//   const refreshToken = req.cookies.get('refreshToken');

//   if (!accessToken && !refreshToken) {
//     return res.status(401).json({ message: 'No tokens provided' });
//   }

//   try {
//     // 액세스 토큰 유효성 검사
//     const validationResponse = await axios.post(
//       'YOUR_SPRING_BOOT_ENDPOINT/validateAccessToken',
//       {
//         token: accessToken,
//       },
//     );

//     if (validationResponse.data.isValid) {
//       next();
//     } else if (refreshToken) {
//       // 리프래시 토큰으로 새 액세스 토큰 획득
//       const tokenResponse = await axios.post(
//         'YOUR_SPRING_BOOT_ENDPOINT/refreshAccessToken',
//         {
//           refreshToken,
//         },
//       );

//       if (tokenResponse.data.accessToken) {
//         res.setHeader('Set-Cookie', [
//           `accessToken=${tokenResponse.data.accessToken}; HttpOnly`,
//         ]);
//         next();
//       } else {
//         res.status(401).json({ message: 'Tokens are invalid' });
//       }
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// export default checkToken;
