import { choi, dol, eun } from '../../public';
export const post = {
  nickname: '닉네임',
  hometown: '동네명',
  title: '혼밥하시는 분들에게 굉장히 좋은 식당 후기',
  desc: '서울에서 올라온지 얼마 안돼 친구가 없어서 밥을 먹을 수 가 없어요 ',
  img: '/dog.jpg',
};
export const DATAList: ResponsePost[] = [
  {
    user: {
      nickname: 'User1',
      email: 'user1@example.com',
      profileImg: choi,
    },
    board: {
      postId: 1,
      title: '첫 번째 게시물',
      locationTag: '부산',
      purposeTag: '여행',
      content: '서울 여행에 대한 정보를 공유합니다.',
      postImg: 'image1.jpg',
      createdAt: '2023-08-01T12:00:00',
      modifiedAt: '2023-08-02T12:00:00',
    },
  },
  {
    user: {
      nickname: 'User2',
      email: 'user2@example.com',
      profileImg: eun,
    },
    board: {
      postId: 2,
      title: '두 번째 게시물',
      locationTag: '부산',
      purposeTag: '여행',
      content: '부산의 맛집을 소개합니다.',
      postImg: 'image2.jpg',
      createdAt: '2023-08-03T12:00:00',
      modifiedAt: '2023-08-04T12:00:00',
    },
  },
  {
    user: {
      nickname: 'User3',
      email: 'user3@example.com',
      profileImg: dol,
    },
    board: {
      postId: 3,
      title: '세 번째 게시물',
      locationTag: '부산',
      purposeTag: '여행',
      content: '대전에서 열리는 개발자 컨퍼런스 정보입니다.',
      postImg: 'image3.jpg',
      createdAt: '2023-08-05T12:00:00',
      modifiedAt: '2023-08-06T12:00:00',
    },
  },
];
