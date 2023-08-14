//util로 가자
import { Libraries } from '@react-google-maps/api';

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
];

export const googleMapsLibraries: Libraries = ['places'];
export const containerStyle = {
  width: '100%',
  height: '100vh',
};
export const mapOptions = {
  disableDefaultUI: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ],
};
