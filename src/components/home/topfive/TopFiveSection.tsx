import { getHotTagTopFive } from '@/service/home';
import HomeWeekleyTopFiveSection from '../HomeWeekleyTopFive';

const TopFiveSection = async () => {
  const weekleyTopFivePromise = await getHotTagTopFive();
  console.log(weekleyTopFivePromise);
  //   if (weekleyTopFivePromise.data instanceof Error) {
  //     <>error</>;
  //   }
  return (
    <>
      <HomeWeekleyTopFiveSection
        weekleyTopFivelist={weekleyTopFivePromise as ResponseRegister}
      />
    </>
  );
};
export default TopFiveSection;
