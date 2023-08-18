import { callIcon, heartIcon, linkIcon } from '@/utils/Icon';
import Icons from '../common/Icons';
import StarRate from '../StarRate';
import DetailInfo from './DetailInfo';

const DetailPlaceInfo = ({ data }: { data: PlaceResult }) => {
  return (
    <>
      {data && (
        <div>
          <div className="border-b-4 border-zinc-300">
            <div className="w-full flex flex-col ">
              <div className="w-full h-40 flex items-center  flex-col text-black text-xl font-semibold  gap-1 mt-6">
                <span>{data.name}</span>
                <div className="flex flex-row justify-center w-full gap-3">
                  <StarRate rating={data.rating} />
                  <div className="left-[115px] top-0  text-zinc-600 text-sm font-normal leading-loose ">
                    <span>{data.user_ratings_total}</span>
                  </div>
                </div>
                <div className="w-full h-7 flex mt-5 ">
                  <div className="flex items-center justify-around relative w-full h-11  rounded-lg border border-zinc-400">
                    <Icons path={callIcon} fill="#404040" />
                    <Icons path={heartIcon} fill="white" stroke="#404040" />
                    <Icons path={linkIcon} fill="#404040" />
                    <div className="border-x-2 absolute w-1/3 h-4/5 border-neutral-300"></div>
                  </div>
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
      )}
    </>
  );
};

export default DetailPlaceInfo;
