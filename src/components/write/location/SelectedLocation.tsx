'use client';
import { detailState, polygonState } from '@/recoil/mapStates';
import { useRecoilValue } from 'recoil';
import Icons from '../../common/Icons';
import { location } from '@/utils/Icon';

interface SelectedLocationProps {
  lname?: string;
  address?: string;
  onWrite?: boolean;
}

export const MockSelectedLocation = () => (
  <div className="py-[32px] px-3">
    <div className="flex justify-start w-full h-full bg-white items-center pl-3 ">
      <div className="flex justify-center items-center">
        <div className="h-full">
          <div className="skeleton w-8 h-8 rounded-full"></div>
        </div>
        <div className="w-full ml-2">
          <div className="skeleton h-4 w-20 mb-1"></div>
          <div className="skeleton h-3 w-24"></div>
        </div>
      </div>
    </div>
  </div>
);

const SelectedLocation = ({
  lname,
  address,
  onWrite,
}: SelectedLocationProps) => {
  const detail = useRecoilValue(detailState);
  const polygonValue = useRecoilValue(polygonState);

  return (
    <div className="flex justify-start w-full h-full bg-white items-center pl-3 ">
      <div className="flex justify-center items-center">
        <div className="h-full">
          <Icons
            path={location}
            fill="none"
            option={{
              stroke: `${onWrite ? '#2DDAB0' : '#B8B8B8'}`,
              strokeWidth: 1,
            }}
          />
        </div>
        {detail ? (
          <div className="w-full">
            <h1 className="text-[0.9rem] font-semibold mb-1 text-gray2">
              {detail?.name}
            </h1>
            <p className="text-neutral-400 text-xs">
              {detail?.formatted_address}
            </p>
          </div>
        ) : lname ? (
          <div className="w-full ml-2 h-full flex flex-col justify-center ">
            <h1 className="text-[0.88rem] font-semibold mb-0.5 text-gray2">
              {lname}
            </h1>
            <p className="text-neutral-400 text-xs">{address}</p>
          </div>
        ) : (
          <p
            className={`ml-2 ${
              onWrite
                ? ' text-gray2 text-[12px]'
                : 'text-neutral-700 text-[12px]'
            } `}
          >
            서울시 {`${polygonValue.gu} ${polygonValue.dong}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default SelectedLocation;
