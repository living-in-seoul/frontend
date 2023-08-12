'use client';
import Image from 'next/image';
import mrchoi from '@/../public/mrchoi.png';
import Link from 'next/link';

const MultiPleCard = (data: ResponseCityImageData) => {
  return (
    <article className="w-[48%] hover:shadow-xl transition-all duration-500 hover:scale-105">
      <div className="relative w-full h-36 rounded-md overflow-hidden shadow-md">
        <Image
          className="absolute top-0 h-auto object-cover"
          src={mrchoi}
          alt={'mrchoi'}
          sizes="210px"
        />
        <Link href={`/place/ChIJdT3Zb-2ifDURejyrGy8OIII/2`} prefetch={false}>
          <Image
            className="absolute top-0 h-auto object-cover"
            src={mrchoi}
            alt={data.AREA_CONGEST_LVL}
            fill
            sizes="210px"
            priority
          />
        </Link>
      </div>
      <div className="flex flex-col px-2 pt-2">
        <h3 className="text-sm font-semibold leading-loose">{data.AREA_NM}</h3>
        <p className="text-zinc-600 text-xs font-normal leading-loose">
          {data.AREA_CONGEST_LVL}
        </p>
        <span className="text-sm rounded-lg bg-green-100">
          {data.AREA_PPLTN_MAX}
        </span>
      </div>
    </article>
  );
};
export default MultiPleCard;
