import PostItem from '@/components/community/PostItem';
import { cookies } from 'next/headers';

const MypageList = async ({ category }: { category: string }) => {
  const token = cookies().get('accessToken')?.value;
  const url = category
    ? category[0] === 'writed'
      ? `${process.env.NEXT_PUBLIC_SERVER}/posts/mypost?page=3&size=2`
      : `${process.env.NEXT_PUBLIC_SERVER}/posts/myscrap?page=3&size=2`
    : `${process.env.NEXT_PUBLIC_SERVER}/posts/mypost?page=3&size=2`;
  const myPageData = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    next: { revalidate: 0 },
    cache: 'no-store',
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
