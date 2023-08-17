/**글쓰기 post */
// 데이터 정해지면 type 바꿔라 꼭 잊지말고
export const writeBoard = async (form: any) => {
  //   data.append('category', formData.category); + location
  // const formData = new FormData();

  // console.log('textdlasdfsd');
  // console.log(text);
  // formData.append('post', text);
  // formData.append('photos', file);

  // console.log('formData야 제발 떠라 ');
  // for (let [key, value] of formData.entries()) {
  //   console.log(`${key}: ${value}`);
  // }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/posts`, {
      body: form,
      method: 'POST',
      headers: {
        responseType: 'stream',
        'Content-Type': form.headers['content-type'],
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjd0BnbWFpbC5jb20iLCJleHAiOjE2OTIyNjg1NzIsImlhdCI6MTY5MjI2NDk3Mn0.PqQlU0_fMmosdMXyCWrGsuQlBxRCdKjCZR6hEUK55J0',
      },
    });

    console.log('-------res');
    console.log(response.status);
    return response;
  } catch (error) {
    console.error('Error sending data:', error);
  }
};
