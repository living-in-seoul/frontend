import { largeEmptyHeart, largeHeart } from '@/utils/Icon';
import Icons from '../common/Icons';
import UserProfile from '../item/UserProfile';
import { DetailMainProps } from './DetailMain';
import DetailLikeBtn from './DetailLikeBtn';

const DetailMainProfile = async ({ data }: { data: DetailMainProps }) => {
  // const likeState = await fetch(
  //   `https://seoulvival.com:8080/posts/${data.postId}/like`
  // ).then<ResponseDetailData>((res) => res.json());

  return (
    <div className="flex flex-row justify-between  px-4">
      <UserProfile
        createdAt={data.createdAt}
        nickname={data.nickname}
        postViewCount={data.postViewCount}
      />
      <DetailLikeBtn
        type={'detail'}
        likeSize={data.likeSize}
        postId={data.postId}
        hasLiked={data.hasLiked}
      />
    </div>
  );
};

export default DetailMainProfile;
