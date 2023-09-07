import BeatLoader from '@/components/common/Spinner';
import HomeSectionTitle from '@/components/home/HomeSectionTitle';
import { getYouth } from '@/service/youth';
import dynamic from 'next/dynamic';

const DynamicYouth = dynamic(() => import('@/components/youth/YouthList'), {
  loading: () => (
    <div
      className={`w-full flex flex-col  justify-center items-center h-[178px] text-sm rounded-xl p-5 pb-3 gap-2`}
    >
      <BeatLoader color="#2DDAB0" />
    </div>
  ),
});
export const revalidate = 60 * 60 * 24;

const YouthPage = async () => {
  const youthList = await getYouth();

  return (
    <>
      <HomeSectionTitle title="최신 서울시 정책 NEWS" />
      <DynamicYouth youthList={youthList} />
    </>
  );
};

export default YouthPage;
