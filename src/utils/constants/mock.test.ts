const exampleMapPost: ResponsePost = {
  location: {
    address: '123 Main St',
    gu: 'Gangnam-gu',
    lname: 'Seoul',
    lat: 37.1234,
    lng: 127.5678,
  },
  user: {
    nickname: 'john_doe',
    email: 'john@example.com',
  },
  post: {
    postId: 1,
    hashtag: '#travel',
    content: 'Exploring a new place!',
    postImg: [],
    createdAt: '2023-01-01T12:34:56Z',
    modifiedAt: '2023-01-01T15:00:00Z',
    lat: 37.4321,
    lng: 126.8765,
    category: 'Travel',
    likeSize: 10,
    commentSize: 5,
    postViewCount: 100,
    title: 'New Adventure',
    locationTag: 'Seoul',
    purposeTag: 'Explore',
  },
  hasLiked: false,
};

const exampleData: ResponseRegister = {
  msg: 'Success',
  pageable: {
    totalPages: 1,
    totalElements: 3,
    size: 10,
  },
  result: [
    {
      location: {
        address: '123 Main St',
        gu: 'Gangnam-gu',
        lname: 'Seoul',
        lat: 37.1234,
        lng: 127.5678,
      },
      user: {
        nickname: 'john_doe',
        email: 'john@example.com',
      },
      post: {
        postId: 1,
        hashtag: '#travel',
        content: 'Exploring a new place!',
        postImg: [],
        createdAt: '2023-01-01T12:34:56Z',
        modifiedAt: '2023-01-01T15:00:00Z',
        lat: 37.4321,
        lng: 126.8765,
        category: 'Travel',
        likeSize: 10,
        commentSize: 5,
        postViewCount: 100,
        title: 'New Adventure',
        locationTag: 'Seoul',
        purposeTag: 'Explore',
      },
      hasLiked: false,
    },
    // Add more examples as needed
  ],
};

export { exampleData, exampleMapPost };
