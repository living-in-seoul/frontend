export const profileModalArray = [
  {
    text: '로그아웃',
    color: 'text-blue-600',
  },
  {
    text: '회원탈퇴',
    color: 'text-red-600',
  },
];

export const commentModalArray = [
  { text: '수정하기', color: 'text-blue-600', first: true, type: 'comment' },
  { text: '삭제하기', color: 'text-red-600', first: false, type: 'comment' },
];

export const detailModalArray = [
  { text: '게시글 수정', color: 'text-blue-600', first: true, type: 'detail' },
  { text: '게시글 삭제', color: 'text-red-600', first: false, type: 'detail' },
];

export const reportModalArray = [
  { text: '신고하기', color: 'text-red-600', first: true, type: 'report' },
  {
    text: '이 사용자 차단하기',
    color: 'text-red-600',
    first: false,
    type: 'report',
  },
];
