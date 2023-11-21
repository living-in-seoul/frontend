import { getHomeDatas } from '@/service/home';
import HomePlaceComponent from './HomePlaceComponent';

const HomePlaceSection = async () => {
  const placeListPromise = await getHomeDatas();

  return (
    <>
      <HomePlaceComponent data={placeListPromise as []} />
    </>
  );
};
export default HomePlaceSection;
