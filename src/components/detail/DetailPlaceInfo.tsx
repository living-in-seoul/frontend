import StarRate from '../common/StarRate';
import DetailInfo from './DetailInfo';

const DetailPlaceInfo = ({ data }: { data: PlaceResult }) => {
  return (
    <>
      <div>
        <div className="border-b-4 border-zinc-300">
          <div className="w-full flex flex-col bg-white  ">
            <div className="w-full h-40 flex items-center  flex-col text-black text-xl font-semibold  gap-1 mt-6">
              <span>{data.name}</span>
              <div className="flex flex-row justify-center w-full gap-3">
                <StarRate rating={data.rating} />
                <div className="left-[115px] top-0  text-zinc-600 text-sm font-normal leading-loose ">
                  <span>{data.user_ratings_total}</span>
                </div>
              </div>
              <div className="w-full h-7 flex mt-5 ">
                <div className="w-full h-11  rounded-lg border border-zinc-400" />
              </div>
            </div>
          </div>
        </div>
        <div className="border-b-4 border-zinc-300">
          <div className="flex flex-col  py-5 gap-2 ">
            <DetailInfo
              formatted_address={data.formatted_address}
              formatted_phone_number={data.formatted_phone_number}
              business_status={data.business_status}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPlaceInfo;
