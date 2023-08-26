import Image from 'next/image';
import { profile } from '../../../../public';
import Icons from '@/components/common/Icons';
import { imageIcon } from '@/utils/Icon';

const EditProfileImage = () => {
  return (
    <div>
      <Image alt="example" src={profile} />
      <Icons
        path={imageIcon}
        fill="none"
        option={{
          stroke: '#404040',
          strokeWidth: '1.5',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
      />
    </div>
  );
};

export default EditProfileImage;
