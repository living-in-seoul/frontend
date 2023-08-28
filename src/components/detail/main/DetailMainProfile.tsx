import UserProfile from '../../item/UserProfile';
import { DetailMainProps } from './DetailMain';

const DetailMainProfile = async ({ data }: { data: DetailMainProps }) => {
  // const likeState = await fetch(
  //   `https://seoulvival.com:8080/posts/${data.postId}/like`
  // ).then<ResponseDetailData>((res) => res.json());

  return (
    <div className="flex flex-row justify-between ">
      <UserProfile
        createdAt={data.createdAt}
        nickname={data.nickname}
        postViewCount={data.postViewCount}
      />
    </div>
  );
};

export default DetailMainProfile;
