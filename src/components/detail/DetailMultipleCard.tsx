import Image from 'next/image';

import dog from '../../../public/dog.jpg';
const DetailMultipleCard = ({ data }: { data: PlaceResult }) => {
  return (
    <article className="w-[48%] hover:shadow-xl transition-all duration-500 hover:scale-105">
      <div className="relative w-full h-36 rounded-md overflow-hidden shadow-md">
        <Image
          className="absolute top-0 h-auto object-cover"
          src={dog}
          alt={'dog'}
          fill
          sizes="210px"
          priority
        />
      </div>
      <div className="flex flex-col px-2 pt-2">
        <h3 className="text-sm font-semibold leading-loose">{}</h3>
        <p className="text-zinc-600 text-xs font-normal leading-loose">{}</p>
        <span className="text-sm rounded-lg bg-green-100">{}</span>
      </div>
    </article>
  );
};
export default DetailMultipleCard;
