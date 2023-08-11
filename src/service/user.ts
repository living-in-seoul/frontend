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

  await fetch(`${process.env.NEXT_PUBLIC_SERVER}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(reqData),
  });
};

const postSingin = async (formData: FormData) => {
  console.log(formData);
  await fetch(`${process.env.NEXT_PUBLIC_SERVER}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

export { registerDataHandler, postSingin };
