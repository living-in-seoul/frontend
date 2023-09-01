import Select from '../common/Select';

interface PostItemBottomProps {
  category: string;
  hashtag?: string | null;
  likeSize?: number;
  commentSize: number;
}

const PostItemBottom = ({
  category,
  hashtag,
  likeSize,
  commentSize,
}: PostItemBottomProps) => {
  return (
    <div className="flex justify-between py-4 items-center">
      <div className="flex gap-2">
        <Select
          disable
          title={category}
          className="rounded-3xl py-2"
          size="small"
        />
        <div className="flex justify-center items-center text-[0.85rem] font-semibold">
          {hashtag
            ?.split('#')
            ?.slice(1)
            .map((tag, i) => (
              <p key={i} className="mr-2.5">{`#${tag}`}</p>
            ))}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="text-neutral-500 text-sm font-normal leading-3">
          좋아요 {likeSize}
        </div>
        <div className="text-neutral-500 text-sm font-normal leading-3">
          댓글 {commentSize}
        </div>
      </div>
    </div>
  );
};

export default PostItemBottom;
