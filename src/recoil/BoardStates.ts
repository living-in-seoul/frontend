import { atom } from 'recoil';

export const ImageState = atom<FileList | null>({
  key: 'ImageState',
  default: null,
});

export const ImagePortalState = atom<boolean>({
  key: 'ImagePortalState',
  default: false,
});
