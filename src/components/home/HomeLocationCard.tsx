import MultiPleCard from '../item/MultiPleCard';

interface HomeLocationCardProps {
  data: ResponseCityImageData[];
}
const HomeLocationCard = ({ data }: HomeLocationCardProps) => {
  return (
    <div className="w-full flex flex-wrap p-4 gap-3">
      {data.map((item) => {
        return (
          <MultiPleCard
            key={item.NON_RESNT_PPLTN_RATE + item.PPLTN_RATE_50}
            {...item}
          />
        );
      })}
    </div>
  );
};
export default HomeLocationCard;
