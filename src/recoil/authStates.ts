import { atom } from 'recoil';
export const signupState = atom<RequestNonessentialRegister>({
  key: 'signupFistState',
  default: {
    email: '',
    gender: '',
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
export const AuthOpenModalState = atom<boolean>({
  key: 'AuthopenModalState',
  default: false,
});
