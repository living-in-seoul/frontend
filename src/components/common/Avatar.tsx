import Image from 'next/image';
import { mrchoi } from '../../../public';

interface AvatarProps {
  image?: string | null;
  size: 'xlarge' | 'large' | 'medium' | 'small';
}

const getContainerStyle = (size: string): string => {
  const baseStyle = 'rounded-full flex items-center justify-center ';

  const { container } = getImageSizeStyle(size);
  return `${baseStyle} ${container}`;
};

interface ImageSizeStyle {
  container: string;
  image: string;
}
const getImageSizeStyle = (size: string): ImageSizeStyle => {
  switch (size) {
    case 'small':
      return {
        container: 'w-9 h-9',
        image: 'w-[34px] h-[34px] p-[0.1rem]',
      };
    case 'medium':
      return {
        container: 'w-11 h-11',
        image: 'w-[42px] h-[42px] p-[0.1rem]',
      };
    case 'large':
      return {
        container: 'w-[68px] h-[68px]',
        image: 'w-16 h-16 p-[0.2rem]',
      };
    case 'xlarge':
      return {
        container: 'w-[142px] h-[142px]',
        image: 'w-[138px] h-[138px] p-[0.3rem]',
      };
    default:
      throw new Error(`Unsupported size: ${size}`);
  }
};

const Avatar = ({ image, size = 'large' }: AvatarProps) => {
  return (
    <div className={getContainerStyle(size)}>
      <Image
        className={`bg-white object-cover rounded-full ${
          getImageSizeStyle(size).image
        }`}
        src={image ?? mrchoi}
        width={100}
        height={100}
        alt="user profile"
      />
    </div>
  );
};

export default Avatar;
