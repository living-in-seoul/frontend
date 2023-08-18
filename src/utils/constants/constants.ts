//페이지별로 파일 분리

import { Libraries } from '@react-google-maps/api';

export const seoulCenterCoords: Partial<SeoulCoords> = {
  강남구: { lat: 37.5172, lng: 127.0473 },
  강동구: { lat: 37.5301, lng: 127.1238 },
  강서구: { lat: 37.5509, lng: 126.8495 },
  관악구: { lat: 37.4784, lng: 126.9516 },
  광진구: { lat: 37.5385, lng: 127.0823 },
  구로구: { lat: 37.4955, lng: 126.8874 },
  금천구: { lat: 37.4519, lng: 126.902 },
  노원구: { lat: 37.6542, lng: 127.0568 },
  강북구: { lat: 37.6395, lng: 127.0255 },
  도봉구: { lat: 37.6688, lng: 127.0471 },
  동대문구: { lat: 37.5744, lng: 127.0397 },
  동작구: { lat: 37.5124, lng: 126.9393 },
  마포구: { lat: 37.5663, lng: 126.9016 },
  서대문구: { lat: 37.5791, lng: 126.9368 },
  서초구: { lat: 37.4837, lng: 127.0324 },
  성동구: { lat: 37.5633, lng: 127.0371 },
  성북구: { lat: 37.5891, lng: 127.0165 },
  송파구: { lat: 37.5145, lng: 127.1066 },
  양천구: { lat: 37.5171, lng: 126.8663 },
  영등포구: { lat: 37.5264, lng: 126.8962 },
  용산구: { lat: 37.5384, lng: 126.9654 },
  은평구: { lat: 37.6027, lng: 126.9291 },
  종로구: { lat: 37.5726, lng: 126.9794 },
  중구: { lat: 37.5641, lng: 126.9979 },
  중랑구: { lat: 37.6066, lng: 127.0927 },
};

export const outerCoords = [
  { lat: 38.634, lng: 124.5863 },
  { lat: 38.634, lng: 131.8727 },
  { lat: 33.0041, lng: 131.8727 },
  { lat: 33.0041, lng: 124.5863 },
];

export const Filters = [
  { name: '음식점', category: 'restaurants' },
  { name: '카페', category: 'cafe' },
  { name: '편의점', category: 'convenience_store' },
  { name: '마트', category: 'supermarket' },
  { name: '은행', category: 'bank' },
  { name: '병원', category: 'hospital' },
  { name: '약국', category: 'pharmacy' },
  { name: '헬스장', category: 'gym' },
  { name: '세탁시설', category: 'laundry' },
  { name: '공원', category: 'park' },
  { name: '도서관', category: 'library' },
  { name: 'atm', category: 'atm' },
  { name: '문화시설', category: 'museum' },
  { name: '대학가', category: 'university' },
  { name: '영화관', category: 'movie_theater' },
];

export const categories = [
  '여성이 많은',
  '남성이 많은',
  '매우 붐빔',
  '여유 로운',
];

export const googleMapsLibraries: Libraries = [
  'places',
  'visualization',
  'marker',
];

export const containerStyle = {
  width: '100%',
  height: '100vh',
};
