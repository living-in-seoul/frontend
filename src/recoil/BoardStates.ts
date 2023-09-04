import { initialForm } from '@/utils/constants/constants';
import { atom } from 'recoil';

export const ImageState = atom<File[] | null>({
  key: 'ImageState',
  default: null,
});

export const ImagePortalState = atom<boolean>({
  key: 'ImagePortalState',
  default: false,
});

export const MapPortalState = atom<boolean>({
  key: 'MapPortalState',
  default: false,
});

export const formDataState = atom<RequestBoardWrite>({
  key: 'FormDataState',
  default: initialForm,
});

export const postIdstate = atom<string>({
  key: 'PostIdState',
  default: '',
});
