/**로그인시 받아오는 데이터 */
interface ResponseLogin {
  msg: string;
  result: {
    email: string;
    nickname: string;
    AccessToken: string;
    AccessTokenExpired: string;
    RefreshToken: string;
    RefreshTokenExpired: string;
    profileImg: string;
  };
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

/**전체 게시물 받아오는 데이터 */
interface ResponseRegister {
  msg: string;
  pageable: Pageable;
  result: {
    user: UserProfile;
    board: BoardInfo;
  }[];
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
  result: {
    user: UserProfile;
    board: BoardInfo;
  };
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
  profileImg: string;
}

/** 게시물 상세 데이터 (게시물만)*/
interface BoardInfo {
  postId: number;
  title: string;
  locationTag: string;
  purposeTag: string;
  content: string;
  postImg: string;
  createdAt: string;
  modifiedAt: string;
}

/** 페이지네이션 데이터*/
interface Pageable {
  totalPages: number;
  totalElements: number;
  size: number;
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
  AREA_NM: string;
  AREA_CD: string;
  AREA_CONGEST_LVL: string;
  AREA_CONGEST_MSG: string;
  AREA_PPLTN_MIN: string;
  AREA_PPLTN_MAX: string;
  MALE_PPLTN_RATE: string;
  FEMALE_PPLTN_RATE: string;
  PPLTN_RATE_0: string;
  PPLTN_RATE_10: string;
  PPLTN_RATE_20: string;
  PPLTN_RATE_30: string;
  PPLTN_RATE_40: string;
  PPLTN_RATE_50: string;
  PPLTN_RATE_60: string;
  PPLTN_RATE_70: string;
  RESNT_PPLTN_RATE: string;
  NON_RESNT_PPLTN_RATE: string;
  REPLACE_YN: string;
  PPLTN_TIME: string;
  FCST_YN: string;
  FCST_PPLTN: Forecast[];
}

/**서울시 API */
interface ResponseCityData {
  SeoulRtd: {
    citydata_ppltn: CityData[];
  };
}
