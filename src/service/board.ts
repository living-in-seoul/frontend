// 데이터 정해지면 type 바꿔라 꼭 잊지말고

import axios from 'axios';
import { instance } from './instance';
interface ResponseDataType {
  message: string;
  code: number;
}
/**글쓰기 post */
export const writeBoard = async (form: any) => {
  try {
    const response = await instance.post(`/posts`, { body: form });
    console.log('-------res');
    console.log(response.status);
    return response;
  } catch (error: any) {
    console.log('ehlsmsdfasdfa', error.message);
  }
};
