import HomeWeekleyTopFiveSection from '@/components/home/HomeWeekleyTopFive';
import { getHotTagTopFive } from '@/service/home';

const TopFiveSectionPage = async () => {
  const weekleyTopFivePromise = await getHotTagTopFive();

  return (
    <>
      <HomeWeekleyTopFiveSection
        weekleyTopFivelist={weekleyTopFivePromise as ResponseRegister}
      />
    </>
  );
};
export default TopFiveSectionPage;
