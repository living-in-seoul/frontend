import MultiPleCard from '../common/MultiPleCard';

interface HomeLocationCardProps {
  data: CityData[];
}
const HomeLocationCard = ({ data }: HomeLocationCardProps) => {
  return (
    <div className="w-full flex flex-wrap p-4 gap-3">
      {data.map((item) => (
        <MultiPleCard key={item.NON_RESNT_PPLTN_RATE} {...item} />
      ))}
    </div>
  );
};
export default HomeLocationCard;
