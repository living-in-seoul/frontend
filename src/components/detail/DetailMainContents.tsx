import Image from 'next/image';
import Icons from '../common/Icons';
import { hashtagIcon } from '@/utils/Icon';
import { DetailMainProps } from './DetailMain';

const DetailMainContents = ({ data }: { data: DetailMainProps }) => {
  const hashtags = data.hashtag.split('#').filter((hashtag) => hashtag);
  return (
    <div className="py-8 border-b-2 px-4">
      <div className=" flex flex-col gap-4  ">
        <div className="overflow-auto">
          {data.content}
          {/* 영어 길게 썼을 때 한문자 취급 되는데 그거 고쳐야지 */}
        </div>
        {data.postImg &&
          data.postImg.map((img, index) => (
            <Image
              key={index}
              src={img.postImg}
              alt={img.id.toString()}
              width={400}
              height={200}
              className="rounded-lg"
            />
          ))}
      </div>
      <div className="flex flex-row gap-4 py-6 ">
        <Icons path={hashtagIcon} fill="#B8B8B8" />
        {hashtags.map((hashtag, index) => (
          <div key={index} className="border">
            #{hashtag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailMainContents;
