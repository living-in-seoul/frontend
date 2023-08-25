import Icons from '@/components/common/Icons';
import { Alert, polygon } from '@/utils/Icon';
import HomeLocationSeclect from './HomeLocationSeclect';

const HomeTopSection = () => {
  return (
    <article className="relative">
      <div className="flex flex-col gap-3 w-full h-64 bg-zinc-300">
        <div className="flex justify-between py-4 px-1.5">
          <HomeLocationSeclect />
          <div className="flex pr-3.5 items-center justify-center">
            <Icons
              path={Alert}
              fill="none"
              option={{
                stroke: 'black',
                strokeWidth: '1.5',
                strokeLinecap: 'round',
              }}
            />
          </div>
        </div>
        <div className="flex justify-between px-4">
          <div>
            <span className="text-black text-xl font-semibold leading-loose">
              예진님,
              <br />
            </span>
            <span className="text-black text-xl font-normal leading-loose">
              오늘도 저와 함께
              <br />
              즐거운 서울생활 시작해 봐요!
            </span>
          </div>
          <div>날씨컴포넌트</div>
        </div>
      </div>
    </article>
  );
};
export default HomeTopSection;
