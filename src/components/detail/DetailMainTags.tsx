import { hashtagIcon } from '@/utils/Icon';
import Icons from '../common/Icons';
import { DetailMainProps } from './DetailMain';
import Link from 'next/link';
import Select from '../common/Select';

const DetailMainTags = ({ data }: { data: DetailMainProps }) => {
  const hashtags = data.hashtag.split('#').filter((hashtag) => hashtag);
  const category = data.category;
  return (
    <div className="flex flex-row gap-4 px-4">
      <Icons path={hashtagIcon} fill="#B8B8B8" />
      {hashtags.map((hashtag, index) => (
        <Link
          key={hashtag}
          href={`/community/${category}/${hashtag}`}
          prefetch={false}
        >
          <Select
            title={`#${hashtag}`}
            key={hashtag}
            className="rounded-md"
            disable
            size="small"
          />
        </Link>
      ))}
    </div>
  );
};

export default DetailMainTags;
