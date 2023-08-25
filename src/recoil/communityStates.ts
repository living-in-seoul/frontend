import { atom } from 'recoil';

export const communityKeyState = atom<string>({
  key: 'communityState',
  default: '',
});
export const HomeKeyState = atom<string>({
  key: 'HomeKeyState',
  default: '',
});
