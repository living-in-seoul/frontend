import StarRate from '../common/StarRate';
import DetailInfo from './DetailInfo';
import DetailInfoItem from './DetailInfoItem';

const DetailPlaceInfo = () => {
  return (
    <div>
      <div className="border-b-4 border-zinc-300">
        <div className="w-full flex flex-col bg-white  ">
          <div className="w-full h-40 flex items-center  flex-col text-black text-xl font-semibold  gap-1 mt-6">
            <span>장소 이름</span>
            <div className="flex flex-row justify-center w-full gap-3">
              <StarRate />

              <div className=" text-black text-sm font-normal leading-loose">
                <span className="border-r-2 pr-2 border-stone-300">5.0</span>
              </div>
              <div className="left-[115px] top-0  text-zinc-600 text-sm font-normal leading-loose ">
                <span>리뷰 830</span>
              </div>
            </div>
            <div className="w-full h-7 flex mt-5 ">
              <div className="w-full h-11  rounded-lg border border-zinc-400" />
            </div>
          </div>
        </div>
      </div>
      <DetailInfo />
      <div className="border-b-4 border-zinc-300">
        <div className="flex flex-col  py-5 gap-2 ">
          <DetailInfo />
          <DetailInfo />
          <DetailInfo />
        </div>
      </div>
    </div>
  );
};

export default DetailPlaceInfo;
