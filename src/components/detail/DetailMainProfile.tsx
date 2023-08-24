import { largeEmptyHeart, largeHeart } from '@/utils/Icon';
import Icons from '../common/Icons';
import UserProfile from '../item/UserProfile';
import { DetailMainProps } from './DetailMain';

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
      {data && data.hasLiked ? (
        <div className="relative flex justify-center items-center">
          <Icons path={largeHeart} fill="#404040" />
          <span className="absolute text-white ">{data.likeSize}</span>
        </div>
      ) : (
        <div className="relative flex justify-center items-center">
          <Icons path={largeEmptyHeart} fill="#404040" />
          <span className="absolute text-white ">{data.likeSize}</span>
        </div>
      )}
    </div>
  );
};

export default DetailMainProfile;
