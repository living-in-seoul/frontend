import { atom } from 'recoil';

export const signupState = atom<RequestRegister>({
  key: 'signupFistState',
  default: {
    email: '',
    nickname: '',
    gender: '',
    password: '',
    hometown: '',
    movedDate: '',
    birthDate: '',
  },
});

export const signupEssentialState = atom<boolean>({
  key: 'isEssentialState',
  default: true,
});

export const callbackUrlState = atom<string>({
  key: 'callbackUrlState',
  default: '',
});
