import { MapStyleVersionTwo } from '../styles';

export const seoulCenterCoords: Partial<SeoulCoords> = {
  전체: { lat: 37.5519, lng: 126.9918 },
  종로구: { lat: 37.572999, lng: 126.979189 },
  중구: { lat: 37.563646, lng: 126.997669 },
  용산구: { lat: 37.531101, lng: 126.981074 },
  성동구: { lat: 37.550675, lng: 127.040962 },
  광진구: { lat: 37.548144, lng: 127.085753 },
  동대문구: { lat: 37.580663, lng: 127.050409 },
  중랑구: { lat: 37.606991, lng: 127.092671 },
  성북구: { lat: 37.589727, lng: 127.016743 },
  강북구: { lat: 37.648446, lng: 127.014716 },
  도봉구: { lat: 37.665861, lng: 127.031767 },
  노원구: { lat: 37.654259, lng: 127.056294 },
  은평구: { lat: 37.602688, lng: 126.929169 },
  서대문구: { lat: 37.579078, lng: 126.936772 },
  마포구: { lat: 37.563562, lng: 126.908421 },
  양천구: { lat: 37.527062, lng: 126.856153 },
  강서구: { lat: 37.565761, lng: 126.822656 },
  구로구: { lat: 37.495486, lng: 126.858121 },
  금천구: { lat: 37.460191, lng: 126.900145 },
  영등포구: { lat: 37.526449, lng: 126.896149 },
  동작구: { lat: 37.512055, lng: 126.939495 },
  관악구: { lat: 37.478406, lng: 126.951613 },
  서초구: { lat: 37.483712, lng: 127.032411 },
  강남구: { lat: 37.495985, lng: 127.066409 },
  송파구: { lat: 37.504853, lng: 127.114482 },
  강동구: { lat: 37.549208, lng: 127.146482 },
};

export const GUARRAY = Object.keys(seoulCenterCoords);

export const outerCoords = [
  { lat: 38.634, lng: 124.5863 },
  { lat: 38.634, lng: 131.8727 },
  { lat: 33.0041, lng: 131.8727 },
  { lat: 33.0041, lng: 124.5863 },
];

export const CommContainerStyle = {
  width: '100%',
  height: '100dvh',
};

export const mapOptions: google.maps.MapOptions = {
  fullscreenControl: true,
  gestureHandling: 'greedy',
  disableDoubleClickZoom: true,
  disableDefaultUI: true,
  styles: MapStyleVersionTwo,
  minZoom: 10,
};

export const initialForm = {
  category: '',
  hashTag: [],
  content: '',
  lat: 0,
  lng: 0,
  lname: '',
  address: '',
  gu: '',
};

export const CODES_TYPE = [
  { name: '일자리', code: '023010', bg: 'bg-[#EEF9FF]', color: 'bg-[#7AD0FF]' },
  { name: '주거', code: '023020', bg: 'bg-[#EFFFF5]', color: 'bg-[#52DE8B]' },
  { name: '교육', code: '023030', bg: 'bg-[#FFFEF4]', color: 'bg-[#F6CA73]' },
  {
    name: '복지.문화',
    code: '023040',
    bg: 'bg-[#F7F0FF]',
    color: 'bg-[#C08EFF]',
  },
  {
    name: '참여.권리',
    code: '023050',
    bg: 'bg-[#FFF4F9]',
    color: 'bg-[#FF9BC3]',
  },
];
