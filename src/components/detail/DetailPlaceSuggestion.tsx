import Image from 'next/image';
import mrchoi from '@/../public/mrchoi.png';

const DetailPlaceSuggestion = () => {
  return (
    <div className="relative w-full h-36 rounded-md overflow-hidden shadow-md">
      <Image
        className="absolute top-0 h-auto object-cover"
        src={mrchoi}
        alt={'adsf'}
        fill
        sizes="210px"
        priority
      />
    </div>
  );
};

export default DetailPlaceSuggestion;
