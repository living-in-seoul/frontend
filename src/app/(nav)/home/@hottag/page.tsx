import HomeWeekleyTopFiveSection from '@/components/home/HomeWeekleyTopFive';
import { getHotTagTopFive } from '@/service/home';
import exampleData from '@/utils/constants/mock.test';

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
