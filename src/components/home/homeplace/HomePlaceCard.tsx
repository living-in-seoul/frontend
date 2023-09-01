import { getImageSrc } from '@/utils/utilFunc';
import Image from 'next/image';
import { imageNone } from '../../../../public';
// eslint-disable-next-line @next/next/no-img-element

interface HomePlaceCardProps {
  list: ResponseCityImageData;
}
const HomePlaceCard = ({ list }: HomePlaceCardProps) => {
  const placeImage = list.image ? getImageSrc(list.image) : imageNone;
  return (
    <article className="flex flex-col w-52 min-w-[208px] h-40 relative ">
      <div className="w-full bg-white h-40 rounded-2xl shadow-lg">
        <div className="relative flex w-full h-24 overflow-hidden rounded-tl-2xl rounded-tr-2xl">
          {list.image ? (
            <Image
              src={`${placeImage}`}
              alt={`${imageNone}`}
              // width={207}
              // height={96}
              fill
              sizes={'100px'}
            />
          ) : (
            <Image
              src={imageNone}
              alt={'imageNone'}
              width={100}
              height={96}
              // fill
              // sizes={'100px'}
            />
          )}
        </div>
        <div className="flex justify-between px-4 py-3">
          <div className="flex flex-col">
            <div className="text-neutral-700 text-base font-semibold leading-loose">
              {list.AREA_NM}
            </div>
            <div className="text-neutral-500 text-xs font-normal">
              종로구 사직로 161
            </div>
          </div>
          <div className="w-8 h-8 bg-red-600 rounded-full" />
        </div>
      </div>
    </article>
  );
};
export default HomePlaceCard;
