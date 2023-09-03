import Image from 'next/image';
import { imageNone } from '../../public';

interface NoneItemProps {
  title?: string;
  description?: string;
}

const NoneItem = ({ title, description }: NoneItemProps) => {
  return (
    <div className="w-full h-[50vh] flex items-center justify-center flex-col grow">
      <Image
        src={imageNone}
        width={150}
        height={250}
        alt="서울이"
        quality={100}
      />
      <div className="text-center text-gray5 text-lg font-semibold mt-5">
        {title}
      </div>
      <div className="text-center text-gray5 text-sm font-normal">
        {description}
      </div>
    </div>
  );
};
export default NoneItem;
