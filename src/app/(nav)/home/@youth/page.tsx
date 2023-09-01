import BeatLoader from '@/components/common/Spinner';
import HomeSectionTitle from '@/components/home/HomeSectionTitle';
import dynamic from 'next/dynamic';

const DynamicYouth = dynamic(() => import('@/components/youth/Youth'), {
  ssr: false,
  loading: () => (
    <div
      className={`w-full flex flex-col  justify-center items-center h-[178px] text-sm rounded-xl p-5 pb-3 gap-2`}
    >
      <BeatLoader color="#2DDAB0" />
    </div>
  ),
});

const YouthPage = () => {
  return (
    <section>
      <HomeSectionTitle title="최신 서울시 정책 NEWS" />
      <DynamicYouth />
    </section>
  );
};

export default YouthPage;
