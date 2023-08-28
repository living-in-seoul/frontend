import { DetailMainProps } from './DetailMain';
import LikeDetailCase from './LikeDetailCase';

const DetailButtons = ({ data }: { data: DetailMainProps }) => {
  return (
    <div>
      <LikeDetailCase
        hasLiked={data.hasLiked}
        likeSize={data.likeSize}
        postId={data.postId}
      />
    </div>
  );
};

export default DetailButtons;
