import { atom } from 'recoil';

export const userPorfileState = atom<RequestPutProfile>({
  key: 'userPorfileState',
  default: {
    nickname: '',
    birthDate: '',
    gender: '',
    hometown: '',
    movedDate: '',
  },
});

export const profileImageState = atom<File | null>({
  key: 'profileImageState',
  default: null,
});

export const signupEssentialState = atom<boolean>({
  key: 'isEssentialState',
  default: true,
});

export const callbackUrlState = atom<string>({
  key: 'callbackUrlState',
  default: '',
});
export const AuthOpenModalState = atom<boolean>({
  key: 'AuthopenModalState',
  default: false,
});

export const signupGenderState = atom<string>({
  key: 'signupGenderState',
  default: '',
});

export const profileOpenModalState = atom<boolean>({
  key: 'profileOpenModalState',
  default: false,
});

export const profileSecondOpenModalState = atom<boolean>({
  key: 'profileSecondOpenModalState',
  default: false,
});

export const AleatSectionState = atom<'active' | 'hastag'>({
  key: 'AleatSectionState',
  default: 'active',
});
export const pushAlertToggleState = atom<boolean>({
  key: 'pushAlertToggleState',
  default: false,
});
export const commentAlertToggleState = atom<boolean>({
  key: 'commentAlertToggleState',
  default: false,
});
export const likeAlertToggleState = atom<boolean>({
  key: 'likeAlertToggleState',
  default: false,
});
export const hashtagAlertToggleState = atom<boolean>({
  key: 'hashtagAlertToggleState',
  default: false,
});

export const notificationState = atom<any>({
  key: 'notificationState',
  default: null,
});
