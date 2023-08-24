import { useSetRecoilState } from 'recoil';
import UploadIcon from './UploadIcon';
import { ImagePortalState } from '@/recoil/BoardStates';
import PreviewImg, { baseClassName } from './PreviewImg';

const UploadImage = () => {
  const setImagePortalState = useSetRecoilState(ImagePortalState);

  return (
    <div className="flex justify-start items-center gap-1 w-[90%] h-full">
      <div
        className={`${baseClassName()} flex-col `}
        onClick={() => setImagePortalState(true)}
      >
        <UploadIcon />
        <span className="text-[0.8rem] font-neutral-300">사진 추가</span>
      </div>
      <PreviewImg />
    </div>
  );
};

export default UploadImage;
