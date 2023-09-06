import { RefObject } from 'react';
import { atom } from 'recoil';

export const HomeReviewKeyState = atom<string>({
  key: 'HomeReviewKeyState',
  default: undefined,
});
export const HomeHomeTownKeyState = atom<string>({
  key: 'HomeHomeTownKeyState',
  default: undefined,
});
export const OpenSearchState = atom<boolean>({
  key: 'OpenSearchState',
  default: false,
});
export const SearchGuState = atom<string>({
  key: 'SearchGuState',
  default: 'false',
});
