import { atom } from 'recoil';

export const filterState = atom<string>({
  key: 'filterState',
  default: '',
});

export const locationTypeState = atom<string>({
  key: 'locationTypeState',
  default: '',
});

/** 맵 센터 !! */
export const centerState = atom<LatLng | google.maps.LatLng>({
  key: 'centerState',
  default: { lat: 37.5519, lng: 126.9918 },
});

/** 유저의 현재 위치 위도경도 */
export const currentState = atom<LatLng>({
  key: 'currentState',
  default: { lat: 0, lng: 0 },
});

/** 현재 맵 센터 구/동*/
export const polygonState = atom<Gudong>({
  key: 'polygonState',
  default: {
    gu: '강남구',
    dong: '',
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

export const selectDongPlaceState = atom<string>({
  key: 'selectDongPlaceState',
  default: '',
});
