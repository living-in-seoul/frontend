import axios, { Axios } from 'axios';
// import { cookies } from 'next/headers';

// const cookieStore = cookies();
// const accessToken = cookieStore.get('accessToke');
// console.log(accessToken);
export const instance: Axios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER}`,
});
//
