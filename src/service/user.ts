/**회원가입 시 */
export const postSignup = async (data: RequestRegister) => {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then<ResponseMsg>((response) => response.json())
    .then((result) => console.log(result));
};
/**로그인 시 */
export const postSingin = async (data: RequestLogin) => {
  await fetch(`${process.env.NEXT_PUBLIC_SERVER}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => console.log(result));
};
