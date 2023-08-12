'use server';

const registerDataHandler = async (formData: FormData) => {
  const reqData = {
    email: formData.get('email'),
    nickname: formData.get('nickname'),
    password: formData.get('password'),
    gu: formData.get('gu'),
    dong: formData.get('dong'),
    hometown: formData.get('hometown'),
    movedDate: formData.get('moveDate'),
  };

  return await fetch(`${process.env.NEXT_PUBLIC_SERVER}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(reqData),
  })
    .then((response) => response.json())
    .then((result) => console.log(result));
};

const postSingin = async (formData: FormData) => {
  await fetch(`${process.env.NEXT_PUBLIC_SERVER}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((result) => console.log(result));
};

export { registerDataHandler, postSingin };
