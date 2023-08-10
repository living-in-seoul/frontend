/** 경도 위도 */
interface LatLng {
  lat: number;
  lng: number;
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

/** 주변 장소 추천 request types */
interface RequestPlaces {
  location: LatLng;
  radius: number;
  types: string[];
}

/** 맵 장소 세부 response by place id*/
interface PlaceByPlaceIdResponse {
  html_attributions: string[];
  result: PlaceResult;
  status: string;
}

//옵셔널은 없는지 확인하기
interface PlaceResult {
  address_components: AddressComponent[];
  adr_address: string;
  business_status: string;
  delivery: boolean;
  dine_in: boolean;
  formatted_address: string;
  formatted_phone_number: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  international_phone_number: string;
  name: string;
  photos: Photo[];
  place_id: string;
  plus_code: PlusCode;
  price_level: number;
  rating: number;
  reference: string;
  reservable: boolean;
  reviews: Review[];
  secondary_opening_hours: SecondaryOpeningHours[];
  serves_beer: boolean;
  serves_breakfast: boolean;
  serves_brunch: boolean;
  serves_dinner: boolean;
  serves_lunch: boolean;
  serves_wine: boolean;
  takeout: boolean;
  types: string[];
  url: string;
  user_ratings_total: number;
  utc_offset: number;
  vicinity: string;
  website: string;
  wheelchair_accessible_entrance: boolean;
}

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
  open_now: boolean;
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

/** 주변 장소 마커 place response */
interface Place {
  business_status?: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport?: {
      northeast?: {
        lat: number;
        lng: number;
      };
      southwest?: {
        lat: number;
        lng: number;
      };
    };
  };
  html_attributions: string[];
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  place_id: string;
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  reference: string;
  scope: string;
  types: string[];
  vicinity: string;
}
