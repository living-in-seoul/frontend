import HomePopulation from '@/components/home/HomePopulation';
import Polygon1 from '@/components/ui/Polygon1';
import Vector from '@/components/ui/Vector';

const HomePage = () => {
  return (
    <section
      className={`relative flex-col flex w-full justify-center h-full bg-white`}
    >
      <div className="relative flex h-full w-full justify-center px-4 pb-9 bg-neutral-400 text-left text-black">
        <div className="flex h-full w-full flex-col">
          <div className="flex w-full items-center font-bold">
            <p className="h-[27px] w-[76px] text-sm leading-[27px]">
              서초구 서초동
            </p>
            <Polygon1 className="h-[7px] w-[7px]" />
            <Vector className="ml-[212px] h-[18px] w-[18px]" />
          </div>
          {/* 메인 홈 사진 */}
          <div className="h-[90px] w-[228px] leading-none">
            <p className="inline text-xl font-[600] leading-[30px]">
              예진님,
              <br />
            </p>
            <p className="inline text-xl font-[400] leading-[30px]">
              오늘도 저와 함께
              <br />
            </p>
            <p className="inline text-xl font-[400] leading-[30px]">
              즐거운 서울생활 시작해 봐요!
            </p>
          </div>
        </div>
      </div>
      <HomePopulation />
    </section>
  );
};
export default HomePage;
