import axios from 'axios';
/**회원가입 시 */
export const postSignup = async (data: RequestRegister) => {
  // console.log(data);
  // console.log('data:::', JSON.stringify(data));
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
    throw error;
  }
};
/**로그인 시 */
export const postSingin = async (data: RequestLogin) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER}/auth/login`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
