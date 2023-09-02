import HomeSectionTitle from '@/components/home/HomeSectionTitle';
import HomePlaceComponent from '@/components/home/homeplace/HomePlaceComponent';
import { getHomeDatas } from '@/utils/constants/place';

const PlacePage = async () => {
  const data = await getHomeDatas();

  return (
    <section>
      <HomeSectionTitle title="서울 주요 장소 인구밀집 현황" />
      <HomePlaceComponent data={data as []} />
    </section>
  );
};
export default PlacePage;
