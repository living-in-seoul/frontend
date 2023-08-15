'use client';
import Image from 'next/image';
import mrchoi from '@/../public/mrchoi.png';
import Link from 'next/link';
import { getImageSrc } from '@/utils/utilFunc';

const MultiPleCard = (data: ResponseCityImageData) => {
  return (
    <article className="w-[48%] hover:shadow-xl transition-all duration-500 hover:scale-105">
      <Link href={`/place/${data.place_id}`} prefetch={false}>
        <div className="relative w-full h-36 rounded-md overflow-hidden shadow-md">
          <Image
            className="absolute top-0 h-auto object-cover"
            src={data.image ? getImageSrc(data.image) : mrchoi}
            alt={data.name ?? '없음'}
            fill
            sizes="210px"
            priority
          />
        </div>
      </Link>
      <div className="flex flex-col px-2 pt-2">
        <h3 className="text-sm font-semibold leading-loose">{data.AREA_NM}</h3>
        <p className="text-zinc-600 text-xs font-normal leading-loose">
          {data.AREA_CONGEST_LVL}
        </p>
        <span className="text-sm rounded-lg bg-green-100">
          {data.AREA_PPLTN_MAX}명
        </span>
      </div>
    </article>
  );
};
export default MultiPleCard;
