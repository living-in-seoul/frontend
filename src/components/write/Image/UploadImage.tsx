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
        <span className="text-[0.68rem] ">
          <span className="font-semibold text-neutral-600">
            {imageState?.length ?? 0}
          </span>
          <span className="text-neutral-500">/5</span>
        </span>
      </div>
      <PreviewImg />
    </div>
  );
};

export default UploadImage;
