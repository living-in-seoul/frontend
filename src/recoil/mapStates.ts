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
  default: '',
});

/** 맵 센터 !! */
export const centerState = atom<LatLng | google.maps.LatLng>({
  key: 'centerState',
  default: {
    lat: 37.4962,
    lng: 127.065,
  },
});

/** 유저의 현재 위치 위도경도 */
export const currentState = atom<LatLng | google.maps.LatLng>({
  key: 'currentState',
  default: {
    lat: 37.4962,
    lng: 127.065,
  },
});

/**유저가 선택한 곳의 디테일 (장소 이름, 주소) */
export const detailState = atom<google.maps.places.PlaceResult | null>({
  key: 'detailState',
  default: null,
});

/** 마커 클릭하면 바텀시트에 보여줄 postId */
export const markerIdState = atom<number | null>({
  key: 'markerIdState',
  default: null,
});

/**전체, 동향소통, 생활정보, 후기 중 어떤건지... */
export const filterOptionState = atom<string>({
  key: 'filterOptionState',
  default: 'All',
});

/** 현재 바텀시트에 보여지는 커뮤니티 리스트들 */
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
