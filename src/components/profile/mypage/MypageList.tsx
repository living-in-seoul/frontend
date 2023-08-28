import PostItem from '@/components/community/PostItem';
import { cookies } from 'next/headers';

const MypageList = async ({ category }: { category: string }) => {
  console.log(category);
  const token = cookies().get('accessToken')?.value;
  const url =
    category[0] === 'writed'
      ? `https://seoulvival.com:8080/posts/mypost?page=3&size=2`
      : `https://seoulvival.com:8080/posts/myscrap?page=3&size=2`;
  const myPageData = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    next: { revalidate: 0 },
  }).then<ResponseMyPostData>((res) => res.json());
  console.log(myPageData);
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
