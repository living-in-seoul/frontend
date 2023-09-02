/* eslint-disable @next/next/no-img-element */
import { useRecoilState } from 'recoil';
import Icons from '../../common/Icons';
import { closeX } from '@/utils/Icon';
import { ImageState } from '@/recoil/BoardStates';

const PreviewImg = () => {
  const [imageStateValue, setImageState] = useRecoilState(ImageState);

  const onDeleteImage = (idx: number) => {
    if (imageStateValue)
      setImageState(imageStateValue?.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex overflow-x-auto scrollbar-hide">
      {imageStateValue?.map((imageFile, idx) => (
        <div
          key={idx}
          className={`${baseClassName()} overflow-hidden relative mr-1`}
        >
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            className="h-full w-full object-cover rounded-lg"
            onLoad={() => URL.revokeObjectURL(String(imageFile))}
          />
          <div
            className="absolute top-2 right-2 bg-black rounded-full p-1"
            onClick={() => onDeleteImage(idx)}
          >
            <Icons
              path={closeX}
              option={{
                stroke: '#d9d9d9',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreviewImg;

export const baseClassName = () => {
  return 'flex justify-center items-center min-w-[80px] h-20 w-20 border border-neutral-400 bg-[#F5F5F5] rounded-2xl gap-1';
};
