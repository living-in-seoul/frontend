import axios, { AxiosInstance } from 'axios';

export const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER,
});

instance.interceptors.request.use(
  (config) => {
    console.log('여기서 꺼내 쓸 수 있는게 없어', config);

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use();

// 소셜로그인을 하게되면 유저정보가 있는지 없는지를 확인하고 회원가입선택사항으로 보내야함
