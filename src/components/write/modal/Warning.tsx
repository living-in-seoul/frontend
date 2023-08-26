import Icons from '@/components/common/Icons';
import { warning } from '@/utils/Icon';

const Warning = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 ">
      <div className="px-2 py-2 bg-neutral-400 rounded-full">
        <Icons
          path={warning}
          option={{
            stroke: '#141414',
            strokeWidth: '7',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
          }}
        />
      </div>
      <p className="text-lg font-semibold text-black">
        작성 중인 글을 취소하시겠습니까?
      </p>
      <span>작성 취소된 글은 저장되지 않습니다.</span>
    </div>
  );
};

export default Warning;
