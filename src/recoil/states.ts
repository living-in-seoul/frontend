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
