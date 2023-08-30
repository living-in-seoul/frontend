import Image from 'next/image';
import Icons from '../../common/Icons';
import { hashtagIcon } from '@/utils/Icon';
import { DetailMainProps } from './DetailMain';

const DetailMainContents = ({ data }: { data: DetailMainProps }) => {
  return (
    <div>
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
              property="none"
            />
          ))}
      </div>
    </div>
  );
};

export default DetailMainContents;
