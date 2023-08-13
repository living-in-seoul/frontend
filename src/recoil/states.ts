import { atom } from 'recoil';

export const filterState = atom<string>({
  key: 'filterState',
  default: '',
});

export const placeIdState = atom<string>({
  key: 'placeIdState',
  default: '',
});

export const placesState = atom<google.maps.places.PlaceResult[]>({
  key: 'placesState',
  default: [],
});

export const signupState = atom<RequestRegister>({
  key: 'signupFistState',
  default: {
    email: '',
    nickname: '',
    password: '',
    gu: '',
    dong: '',
    hometown: '',
    movedDate: '',
  },
});

export const signupEssentialState = atom<boolean>({
  key: 'isEssentialState',
  default: true,
});
