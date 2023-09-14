import HomeSectionTitle from '@/components/home/HomeSectionTitle';
import HomeWeekleyTopFiveSection from '@/components/home/HomeWeekleyTopFive';

export const revalidate = 60 * 60 * 5;

const HotTagPage = async () => {
  const weekleyTopFivelist = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/tags/posts?category=&page=1&size=5&hashtagName=&type=popular`,
    { next: { revalidate: 1000 } },
  ).then<ResponseRegister>((res) => res.json());

  return (
    <section className="pb-5">
      <HomeSectionTitle title="주간 TOP 5 커뮤니티 게시글" />
      <HomeWeekleyTopFiveSection weekleyTopFivelist={weekleyTopFivelist} />
    </section>
  );
};
export default HotTagPage;
