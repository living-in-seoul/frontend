import { useRecoilValue, useSetRecoilState } from 'recoil';
import UploadIcon from './UploadIcon';
import { ImagePortalState, ImageState } from '@/recoil/BoardStates';

const UploadImage = () => {
  const setImagePortalState = useSetRecoilState(ImagePortalState);
  const ImageStateValue = useRecoilValue(ImageState);

  return (
    <div className="flex justify-start items-center gap-3 w-[90%] h-full">
      <div
        className={`${baseClassName()}`}
        onClick={() => setImagePortalState(true)}
        //파일 집어넣기!!!
      >
        <UploadIcon />
        <span className="text-[0.3rem] font-neutral-300">사진 추가</span>
      </div>
      {ImageStateValue && ImageStateValue.length > 0 ? (
        <div className={`${baseClassName()}`}>
          <span>미리보기 준비중!</span>
        </div>
      ) : (
        <div className={`${baseClassName()}`}></div>
      )}
    </div>
  );
};

export default UploadImage;

const baseClassName = () => {
  return 'flex flex-col justify-center items-center h-20 w-20 border border-neutral-300 bg-neutral-100 rounded-2xl gap-1';
};
