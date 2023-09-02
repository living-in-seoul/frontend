import HomeSectionTitle from '@/components/home/HomeSectionTitle';
import HomeWeekleyTopFiveSection from '@/components/home/HomeWeekleyTopFive';

const HotTagPage = async () => {
  const weekleyTopFivelist = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/tags/post/All?page=1&size=5&hashtagName=&type=popular`,
  ).then<ResponseRegister>((res) => res.json());

  return (
    <section className="pb-5">
      <HomeSectionTitle title="주간 TOP 5 커뮤니티 게시글" />
      <HomeWeekleyTopFiveSection weekleyTopFivelist={weekleyTopFivelist} />
    </section>
  );
};
export default HotTagPage;
