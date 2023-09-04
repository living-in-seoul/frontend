import { atom } from 'recoil';

export const communityKeyState = atom<string>({
  key: 'communityState',
  default: '',
});
export const HomeKeyState = atom<string>({
  key: 'HomeKeyState',
  default: '',
});

export const recentlySearchedState = atom<string[]>({
  key: 'recentlySearchedState',
  default: [],
});
export const searchState = atom<string>({
  key: 'searchState',
  default: '',
});
