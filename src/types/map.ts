/** 맵 토글 (커뮤니티 or 교통정보)  */
type MapToggle = 'community' | 'transport';

/** 경도 위도 */
interface LatLng {
  lat: number;
  lng: number;
}

interface Gudong {
  gu: guchung;
  dong: string;
}

/**바텀시트 이벤트 메트릭스 */
interface BottomSheetMetrics {
  touchStart: {
    sheetY: number;
    touchY: number;
  };
  touchMove: {
    prevTouchY: number;
    movingDirection: 'none' | 'up' | 'down';
  };
  contentBeingTouched: boolean;
}

/** 자동완성 검색어 response */
interface PlacesResponse {
  predictions: Prediction[];
  status: string;
}

interface Prediction {
  description: string;
  matched_substrings: MatchedSubstring[];
  place_id: string;
  reference: string;
  structured_formatting: StructuredFormatting;
  terms: Term[];
  types: string[];
}

interface MatchedSubstring {
  length: number;
  offset: number;
}

interface StructuredFormatting {
  main_text: string;
  main_text_matched_substrings: MatchedSubstring[];
  secondary_text: string;
}

interface Term {
  offset: number;
  value: string;
}

/** LatLng 함수일 경우 */

/** 주변 장소 추천 request types */
interface RequestPlaces {
  location: LatLng;
  radius: number;
  types: string[];
}

/** 맵 장소 세부 response by place id*/
interface PlaceByPlaceIdResponse {
  html_attributions: string[];
  result: google.maps.places.PlaceResult;
  status: string;
}

// interface ResponseImageGoogle {
//   results: GooglePlacePickedResult[];
// }

interface Dong {
  type: string;
  features: Feature[];
}

interface Feature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

interface Geometry {
  type: string;
  coordinates: number[][][];
}

interface Properties {
  EMD_CD: string;
  EMD_NM: string;
  SGG_OID: number;
  COL_ADM_SE: string;
  GID: number;
  SGG_NM?: string; // 추가적으로 넣은 구 이름
}

type guchung =
  | ''
  | '강남구'
  | '강동구'
  | '강북구'
  | '강서구'
  | '관악구'
  | '광진구'
  | '구로구'
  | '금천구'
  | '노원구'
  | '도봉구'
  | '동대문구'
  | '동작구'
  | '마포구'
  | '서대문구'
  | '서초구'
  | '성동구'
  | '성북구'
  | '송파구'
  | '양천구'
  | '영등포구'
  | '용산구'
  | '은평구'
  | '종로구'
  | '중구'
  | '중랑구';
type SeoulCoords = {
  [key in guchung]: {
    lat: number;
    lng: number;
  };
};

// type GooglePlacePickedResult = Pick<
//   PlaceResult,
//   | 'business_status'
//   | 'formatted_address'
//   | 'geometry'
//   | 'icon'
//   | 'icon_background_color'
//   | 'icon_mask_base_uri'
//   | 'name'
//   | 'photos'
//   | 'place_id'
//   | 'plus_code'
//   | 'rating'
//   | 'reference'
//   | 'types'
//   | 'user_ratings_total'
// >;
interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface Geometry {
  location: Location;
  viewport: Viewport;
}

interface Location {
  lat: number;
  lng: number;
}

interface Viewport {
  northeast: Location;
  southwest: Location;
}

interface Photo {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
}

interface PlusCode {
  compound_code: string;
  global_code: string;
}

interface Review {
  author_name: string;
  author_url: string;
  language: string;
  original_language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated: boolean;
}

interface SecondaryOpeningHours {
  open_now?: boolean;
  periods: Period[];
  type: string;
  weekday_text: string[];
}

interface Period {
  close: CloseOpen;
  open: CloseOpen;
}

interface CloseOpen {
  date: string;
  day: number;
  time: string;
}
