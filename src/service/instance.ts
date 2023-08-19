import axios from 'axios';

export const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
