// 데이터 정해지면 type 바꿔라 꼭 잊지말고

interface ResponseDataType {
  message: string;
  code: number;
}
/**글쓰기 post */
export const writeBoard = async (form: any) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/posts`, {
      body: form,
      method: 'POST',
    });

    console.log(response);
    return response;
  } catch (error: any) {
    console.log('ehlsmsdfasdfa', error.message);
  }
};
