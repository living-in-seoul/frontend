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

export const googleMapsLibraries: Libraries = ['places', 'visualization'];

export const containerStyle = {
  width: '100%',
  height: '100vh',
};

export const guMapping: { [key: string]: string } = {
  '11110': '종로구',
  '11140': '중구',
  '11170': '용산구',
  '11200': '성동구',
  '11215': '광진구',
  '11230': '동대문구',
  '11260': '중랑구',
  '11290': '성북구',
  '11305': '강북구',
  '11320': '도봉구',
  '11350': '노원구',
  '11380': '은평구',
  '11410': '서대문구',
  '11440': '마포구',
  '11470': '양천구',
  '11500': '강서구',
  '11530': '구로구',
  '11545': '금천구',
  '11560': '영등포구',
  '11590': '동작구',
  '11620': '관악구',
  '11650': '서초구',
  '11680': '강남구',
  '11710': '송파구',
  '11740': '강동구',
};
