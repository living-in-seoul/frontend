import { ImagePortalState, ImageState } from '@/recoil/BoardStates';
import { ChangeEvent } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Button from '../../common/Button';
import toast, { Toaster } from 'react-hot-toast';

interface UploadImageModalProps {
  onClose: () => void;
}

const UploadImageModal = ({ onClose }: UploadImageModalProps) => {
  const setOpenImagePortal = useSetRecoilState(ImagePortalState);
  const [imageState, setImageState] = useRecoilState(ImageState);

  const onChangePostImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if ((imageState ? imageState.length : 0) + filesArray.length > 5) {
        toast('사진은 최대 5장까지만 업로드 가능합니다.', {
          icon: '❕',
          style: {
            borderRadius: '5px',
            background: '#333',
            color: '#fff',
            fontSize: '15px',
          },
        });
        return;
      }
      setImageState(filesArray);
      setOpenImagePortal(false);
    }
  };

  return (
    <div className=" h-full w-full">
      <div className="relative w-full h-16">
        <label className="absolute w-full h-full flex items-center justify-center cursor-pointer">
          사진 업로드
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
      <Toaster />
    </div>
  );
};

export default UploadImageModal;
