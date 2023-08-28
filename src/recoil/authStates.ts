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

export const userPorfileState = atom<RequestProfilePutData>({
  key: 'userPorfileState',
  default: {
    nickname: '',
    birthDate: '',
    gender: '',
    hometown: '',
    movedDate: '',
    거주지역: '',
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
