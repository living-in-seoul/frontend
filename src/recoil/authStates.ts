import { atom } from 'recoil';
// export const signupState = atom<RequestRegister>({
//   key: 'signupFistState',
//   default: {
//     email: '',
//     nickname: '',
//     password: '',
//     gu: '',
//     dong: '',
//     hometown: '',
//     movedDate: '',
//   },
// });

export const signupEssentialState = atom<boolean>({
  key: 'isEssentialState',
  default: true,
});
