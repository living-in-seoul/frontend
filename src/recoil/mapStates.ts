import { atom } from 'recoil';

export const filterState = atom<string>({
  key: 'filterState',
  default: '',
});

export const locationTypeState = atom<string>({
  key: 'locationTypeState',
  default: '',
});

/** 어떤 맵인지 */
export const toggleMapState = atom<'community' | 'transport'>({
  key: 'toggleMapState',
  default: 'community',
});

/**구, 동 서초구 서초동! */
export const gudongState = atom<string>({
  key: 'dongState',
  default: '서초구 서초동', //수정필요
});

/** 마커 클릭하면 바텀시트에 보여줄 postId */
export const markerIdState = atom<number | null>({
  key: 'markerIdState',
  default: null,
});

/**전체, 동향소통, 후기 ... */
export const filterOptionState = atom<string>({
  key: 'filterOptionState',
  default: '',
});

export const boardListState = atom<ResponseRegister | null>({
  key: 'boardListState',
  default: null,
});

export const placeIdState = atom<string>({
  key: 'placeIdState',
  default: '',
});

/** 구 선택 */
export const selectGuPlaceState = atom<guchung>({
  key: 'selectGuPlaceState',
  default: '',
});
export const selectDongPlaceState = atom<string>({
  key: 'selectDongPlaceState',
  default: '',
});
