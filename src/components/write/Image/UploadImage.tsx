'use client';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import UploadIcon from './UploadIcon';
import { ImagePortalState, ImageState } from '@/recoil/BoardStates';
import PreviewImg, { baseClassName } from './PreviewImg';

const UploadImage = () => {
  const setImagePortalState = useSetRecoilState(ImagePortalState);
  const imageState = useRecoilValue(ImageState);

  return (
    <div className="flex justify-start items-center gap-1 w-[90%] h-full">
      <div
        className={`${baseClassName()} flex-col `}
        onClick={() => setImagePortalState(true)}
      >
        <UploadIcon />
        <span className="text-[0.8rem] font-neutral-300">
          {imageState?.length ?? 0}/5
        </span>
      </div>
      <PreviewImg />
    </div>
  );
};

export default UploadImage;
