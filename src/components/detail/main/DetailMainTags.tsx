import { hashtagIcon } from '@/utils/Icon';
import Icons from '../../common/Icons';
import Link from 'next/link';
import Select from '../../common/Select';
import { categoryEN } from '@/utils/utilFunc';

const DetailMainTags = ({ data }: { data: ResponseDetailData }) => {
  const hashtags = data.result.post.hashtag
    .split('#')
    .filter((hashtag) => hashtag);
  const category = categoryEN(data.result.post.category);

  return (
    <div className="flex flex-row gap-4">
      <Icons path={hashtagIcon} fill="#2DDAB0" />
      {hashtags.map((hashtag, index) => (
        <Link
          key={hashtag}
          href={`/community?category=${category}&tag=${hashtag}`}
          prefetch={false}
        >
          <Select
            title={`#${hashtag}`}
            key={hashtag}
            className="rounded-md"
            disable
            size="medium"
          />
        </Link>
      ))}
    </div>
  );
};

export default DetailMainTags;
