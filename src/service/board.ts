/**글쓰기 post */
// 데이터 정해지면 type 바꿔라 꼭 잊지말고
export const config = {
  api: {
    bodyParser: false,
  },
};
export const writeBoard = async (form: any) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/posts`, {
      body: form,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0cmdmNDU2QG5hdmVyLmNvbSIsImV4cCI6MTY5MjI4NDk3NCwiaWF0IjoxNjkyMjgxMzc0fQ.np6QVfFDN-8CR0lc6ANNmJHIfV023_WUQuGuzFL8G1c',
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    return response;
  } catch (error) {
    console.error('Error sending data:', error);
  }
};
