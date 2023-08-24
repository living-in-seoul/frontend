import { ImagePortalState, ImageState } from '@/recoil/BoardStates';
import { ChangeEvent, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Button from '../../common/Button';

interface UploadImageModalProps {
  onClose: () => void;
}

const UploadImageModal = ({ onClose }: UploadImageModalProps) => {
  const setOpenImagePortal = useSetRecoilState(ImagePortalState);
  const [imageState, setImageState] = useRecoilState(ImageState);

  const onChangePostImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files); // FileList를 File[]로 변환
      setImageState(filesArray);
      setOpenImagePortal(false);
    }
  };

  return (
    <div className=" h-full w-full">
      <div className=" items-center flex justify-center w-full h-10 text-center text-sm">
        사진 업로드
      </div>
      <div className="relative w-full h-16">
        <label className="absolute w-full h-full flex items-center justify-center cursor-pointer">
          갤러리에서 가져오기
          <input
            className="opacity-0 absolute w-full h-full"
            name="postImg"
            type="file"
            multiple
            onChange={(e) => onChangePostImg(e)}
          />
        </label>
      </div>
      <div className="w-full flex justify-center items-center">
        <Button
          title="닫기"
          size="medium"
          className="text-neutral-500"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default UploadImageModal;
