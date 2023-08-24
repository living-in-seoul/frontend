import { currentState, detailState } from '@/recoil/mapStates';
import { useRecoilValue } from 'recoil';
import Icons from '../../common/Icons';
import { location } from '@/utils/Icon';
import { formDataState } from '@/recoil/BoardStates';

const SelectedLocation = () => {
  const detail = useRecoilValue(detailState);
  const formData = useRecoilValue(formDataState);
  const center = useRecoilValue(currentState);
  const currentValue = useRecoilValue(currentState);

  return (
    <div className="flex justify-between w-full items-center ">
      <div className="flex justify-center items-center">
        <Icons
          path={location}
          fill="none"
          option={{ stroke: '#B8B8B8', strokeWidth: 1.5 }}
        />
        {detail ? (
          <>
            <div className="w-[85%] ">
              <h1 className="text-[0.88rem] font-semibold mb-1 text-black">
                {detail?.name}
              </h1>
              <p className="text-neutral-400 text-xs">
                {detail?.formatted_address}
              </p>
            </div>
          </>
        ) : formData.lat !== 0 ? (
          <p className="ml-2 text-sm text-neutral-400">위치 선택 완료</p>
        ) : (
          <p className="ml-2 text-sm text-neutral-400">
            공유할 위치를 선택해 주세요
          </p>
        )}
      </div>
    </div>
  );
};

export default SelectedLocation;
