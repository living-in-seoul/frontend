import PostItem from '@/components/community/PostItem';
import { cookies } from 'next/headers';

const MypageList = async ({ category }: { category: string }) => {
  const token = cookies().get('accessToken')?.value;
  const url =
    category === 'writed'
      ? `${process.env.NEXT_PUBLIC_SERVER}/posts/mypost?page=1&size=3`
      : `${process.env.NEXT_PUBLIC_SERVER}/posts/myscrap?page=1&size=3`;

  // const tokenValidResponse = await fetch('/api/user', {
  //   method: 'GET',
  // });

  // if (tokenValidResponse.status === 200) {
  //   try {
  //   } catch (e) {
  //     alert('게시물 작성 실패!');
  //   }
  // } else {
  //   alert('로그인 모달 나와주세요');
  // }

  const myPageData = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    next: { revalidate: 10 },
  }).then<ResponseMyPostData>((res) => res.json());
  return (
    <div>
      {myPageData &&
        myPageData.result.map((data) => (
          <PostItem
            key={data.post.postId}
            location={data.location}
            post={data.post}
            user={data.user}
            hasLiked
          />
        ))}
    </div>
  );
};

export default MypageList;
