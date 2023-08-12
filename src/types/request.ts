/**  로그인 요청 데이터*/
interface RequestLogin {
  email: string;
  password: string;
}

/** 소셜 로그인 요청 데이터*/
interface RequestOauthLogin {
  code: string;
}

/** 회원가입 요청 데이터 */
interface RequestRegister {
  email: string;
  nickname: string;
  password: string;
  gu?: string;
  dogn?: string;
  hometown?: string;
  movedDate?: string;
}

/** 게시물 수정 요청 데이터 */
interface RequestBoardUpdate {
  title: string;
  locationTag: string;
  purposeTag: string;
  content: string;
}

/** 전체 게시물 조회 요청 데이터  */
interface RequestAllBoard {
  keyword: string;
  page: number;
  size: number;
}

/** 게시물 검색 요청 데이터 */
interface RequestBoardSearch {
  search: string;
}
