import { getImageSrc } from '@/utils/utilFunc';
import Image from 'next/image';
import { imageNone } from '../../../../public';
import { PlaceData } from '@/utils/constants/place';
// eslint-disable-next-line @next/next/no-img-element

interface HomePlaceCardProps {
  list: CityData;
}

const HomePlaceCard = ({ list }: HomePlaceCardProps) => {
  const CongestionLevelElemet = (
    level: '붐빔' | '약간 붐빔' | '보통' | '여유',
  ) => {
    switch (level) {
      case '보통':
        return {
          color: 'bg-sky-300',
          text: '보통',
        };
      case '붐빔':
        return {
          color: 'bg-red-600',
          text: '붐빔',
        };
      case '약간 붐빔':
        return {
          color: 'bg-amber-400',
          text: '혼잡',
        };
      case '여유':
        return {
          color: 'bg-emerald-500',
          text: '한산',
        };

      default:
        return {
          color: 'bg-emerald-500',
          text: '한산',
        };
    }
  };
  return (
    <article className="flex flex-col w-52 min-w-[208px] h-40 relative ">
      <div className="w-full bg-white h-40 rounded-2xl shadow-lg">
        <div className="relative flex w-full h-24 overflow-hidden rounded-tl-2xl rounded-tr-2xl">
          <Image
            src={`/placeimg/${list.AREA_NM}.jpg`}
            alt={'imageNone'}
            fill
            sizes={'33vw'}
            quality={30}
            className="none"
          />
        </div>
        <div className="flex justify-between items-center px-4 pb-3 pt-1.5">
          <div className="flex flex-col">
            <div className="text-neutral-700 text-base font-semibold leading-7">
              {PlaceData[`${list.AREA_NM}`].simpleName}
            </div>
            <div className="text-neutral-500 text-xs font-normal">
              {PlaceData[`${list.AREA_NM}`].adress}
            </div>
          </div>

          <div
            className={`flex justify-center items-center w-8 h-8 ${
              CongestionLevelElemet(list.AREA_CONGEST_LVL).color
            } rounded-full`}
          >
            <div className="text-center text-white text-xs font-semibold leading-3">
              {CongestionLevelElemet(list.AREA_CONGEST_LVL).text}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
export default HomePlaceCard;
