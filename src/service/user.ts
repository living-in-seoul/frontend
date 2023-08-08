'use server';

export async function handleSubmit(formData: FormData) {
  const reqData = {
    email: formData.get('email'),
    nickname: formData.get('nickname'),
    password: formData.get('password'),
    // gu: formData.get('gu'),
    // dong: formData.get('dong'),
    hometown: formData.get('hometown'),
    movedDate: formData.get('moveDate'),
  };
  console.log(reqData);

  await fetch(`${process.env.SERVER}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(reqData),
  });
}
