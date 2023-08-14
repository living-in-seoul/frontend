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
/** 구 선택 */
export const selectGuPlaceState = atom<guchung>({
  key: 'selectGuPlaceState',
  default: '',
});
export const signupState = atom<RequestRegister>({
  key: 'signupFistState',
  default: {
    email: '',
    nickname: '',
    password: '',
    gender: '',
    birthDate: '',
    hometown: '',
    movedDate: '2017-12-12',
  },
});

export const signupEssentialState = atom<boolean>({
  key: 'isEssentialState',
  default: true,
});
