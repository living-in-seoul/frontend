import HomeSectionTitle from '@/components/home/HomeSectionTitle';
import HomePlaceComponent from '@/components/home/homeplace/HomePlaceComponent';

const PlacePage = () => {
  return (
    <section>
      <HomeSectionTitle title="서울 주요 장소 인구밀집 현황" />
      <HomePlaceComponent />
    </section>
  );
};
export default PlacePage;
