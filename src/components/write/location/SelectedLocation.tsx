'use client';
import { currentState, detailState, polygonState } from '@/recoil/mapStates';
import { useRecoilValue } from 'recoil';
import Icons from '../../common/Icons';
import { location } from '@/utils/Icon';
import { formDataState } from '@/recoil/BoardStates';

interface SelectedLocationProps {
  lname?: string;
  address?: string;
  onWrite?: boolean;
}

const SelectedLocation = ({
  lname,
  address,
  onWrite,
}: SelectedLocationProps) => {
  const detail = useRecoilValue(detailState);
  const formData = useRecoilValue(formDataState);
  const currentValue = useRecoilValue(currentState);
  const polygonValue = useRecoilValue(polygonState);

  return (
    <div className="flex justify-start w-full h-full  bg-white items-center px-3 ">
      <div className="flex justify-center items-center">
        <Icons
          path={location}
          fill="none"
          option={{
            stroke: `${onWrite ? '#2DDAB0' : '#B8B8B8'}`,
            strokeWidth: 1.5,
          }}
        />
        {detail ? (
          <div className="w-full ml-5">
            <h1 className="text-[0.9rem] font-semibold mb-1 text-black">
              {detail?.name}
            </h1>
            <p className="text-neutral-400 text-xs">
              {detail?.formatted_address}
            </p>
          </div>
        ) : lname ? (
          <div className="w-full ml-2 h-full flex flex-col justify-center ">
            <h1 className="text-[0.88rem] font-semibold mb-0.5 text-black">
              {lname}
            </h1>
            <p className="text-neutral-400 text-xs">{address}</p>
          </div>
        ) : (
          <p
            className={`ml-2 ${
              onWrite ? ' text-neutral-400  text-xs' : 'text-neutral-700 '
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
