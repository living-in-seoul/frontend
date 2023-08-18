/**로그인시 받아오는 데이터 */
interface ResponseLogin {
  msg: string;
  AccessToken: string;
  refreshToken: string;
}

/**소셜 로그인시 받아오는 데이터 */
interface ResponseOauthLogin {
  msg: string;
  result: {
    email: string;
    nickname: string;
    AccessToken: string;
    AccessTokenExpired: string;
    refreshToken?: string;
    RefreshTokenExpired?: string;
    profileImg: string;
  };
}

/** 토큰재발급 */
interface ResponseAccessToken {
  msg: string;
  accessToken: string;
}

/** 전체 맵 조회 - 유저 위치 구,동 받기*/
interface ResponseLocation {
  msg: string;
  result: {
    gu: string;
    dong: string;
  };
}

/** 게시물 상세 페이지 데이터 (게시물+유저정보) */
interface ResponseBoardDetail {
  msg: string;
  result: ResponsePost;
}

/** msg 데이터 (ex. "msg" : "게시물 등록 성공") */
interface ResponseMsg {
  msg: string;
}

/**게시물 검색 자동완성 전체 데이터 */
interface ResponseAutoComplete {
  msg: string;
  result: SearchResult[];
}

/** 유저 정보 데이터*/
interface UserProfile {
  nickname: string;
  email: string;
  profileImg?: string;
}

interface BoardInfo {
  postId: number;
  hashtag: string;
  content: string;
  postImg: { id: number; postImg: string }[];
  createdAt: string;
  modifiedAt: string;
  lat: number;
  lng: number;
  category: string;
  likeSize: number;
  postViewCount: number;

  title?: string;
  locationTag?: string;
  purposeTag?: string;
}

interface Pageable {
  totalPages: number;
  totalElements: number;
  size: number;
}

interface ResponseRegister {
  msg: string;
  pageable: Pageable;
  result: ResponsePost[];
}

interface ResponsePost {
  user: UserProfile;
  post: BoardInfo;
}
/**게시물 검색 자동완성 개별 데이터 */
interface SearchResult {
  postId: number;
  title: string;
}

/**서울시 API 혼잡도 데이터 */
interface Forecast {
  FCST_TIME: string;
  FCST_CONGEST_LVL: string;
  FCST_PPLTN_MIN: string;
  FCST_PPLTN_MAX: string;
}

/**서울시 API 내부 데이터 */
interface CityData {
  /** 실시간 인구현황 */
  AREA_NM: string;
  /** 장소 혼잡도 지표 */
  AREA_CONGEST_LVL: string;
  /** 장소 혼잡도 지표 관련 메세지 */
  AREA_CONGEST_MSG: string;
  /** 실시간 인구 지표 최소값 */
  AREA_PPLTN_MIN: string;
  /** 실시간 인구 지표 최대값 */
  AREA_PPLTN_MAX: string;
  /** 남성 인구 비율(남성) */
  MALE_PPLTN_RATE: string;
  /** 여성 인구 비율(여성) */
  FEMALE_PPLTN_RATE: string;
  /** 0~10세 인구 비율 */
  PPLTN_RATE_0: string;
  /** 10대 실시간 인구 비율 */
  PPLTN_RATE_10: string;
  /** 20대 실시간 인구 비율 */
  PPLTN_RATE_20: string;
  /** 30대 실시간 인구 비율 */
  PPLTN_RATE_30: string;
  /** 40대 실시간 인구 비율 */
  PPLTN_RATE_40: string;
  /** 50대 실시간 인구 비율 */
  PPLTN_RATE_50: string;
  /** 60대 실시간 인구 비율 */
  PPLTN_RATE_60: string;
  /** 70대 실시간 인구 비율 */
  PPLTN_RATE_70: string;
  /** 상주 인구 비율 */
  RESNT_PPLTN_RATE: string;
  /** 비상주 인구 비율 */
  NON_RESNT_PPLTN_RATE: string;
  /** 대체 데이터 여부 */
  REPLACE_YN: string;
  /** 실시간 인구 데이터 업데이트 시간 */
  PPLTN_TIME: string;
  /** 예보 여부 */
  FCST_YN: string;
  /** 예보 인구 데이터 */
  FCST_PPLTN: Forecast[];
}

/**서울시 API */
interface ResponseCityData {
  'SeoulRtd.citydata_ppltn': CityData[];
}

interface ResponseCityImageData extends CityData {
  image: string;
  place_id: string;
  name: string;
  geometry: {
    location: LatLng;
    viewport: {
      northeast: LatLng;
      southwest: LatLng;
    };
  };
}
