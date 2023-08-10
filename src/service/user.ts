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

  await fetch(`${process.env.SERVER}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(reqData),
  });
};

const signinDataHandler = async (formData: FormData) => {
  const reqData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  console.log(reqData);
  await fetch(`${process.env.SERVER}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(reqData),
  });
};

export { registerDataHandler, signinDataHandler };
