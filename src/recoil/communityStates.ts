import { atom } from 'recoil';

export const communityKeyState = atom<string>({
  key: 'communityState',
  default: '',
});
