/**글쓰기 post */
// 데이터 정해지면 type 바꿔라 꼭 잊지말고
export const writeBoard = async (form: any) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/posts`, {
      body: form,
      method: 'POST',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjd0BnbWFpbC5jb20iLCJleHAiOjE2OTIyODMxOTQsImlhdCI6MTY5MjI3OTU5NH0.eVsB5OWwB12UN5riQItbY40nUGwkkcuxYveTfdGNBPA',
      },
    });
    console.log('-------res');
    console.log(response.status);
    return response;
  } catch (error) {
    console.error('Error sending data:', error);
  }
};
