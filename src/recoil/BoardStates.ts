import { atom } from 'recoil';

export const ImageState = atom<File[] | null>({
  key: 'ImageState',
  default: null,
});

export const ImagePortalState = atom<boolean>({
  key: 'ImagePortalState',
  default: false,
});

export const formDataState = atom<RequestBoardWrite>({
  key: 'FormDataState',
  default: {
    category: '',
    hashTag: [],
    content: '',
    lat: 37.5519,
    lng: 126.9918,
  },
});
