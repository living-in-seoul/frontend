import DetailComment from '@/components/detail/comment/DetailComment';
import DetailHeader from '@/components/detail/DetailHeader';
import DetailHotHashtag from '@/components/detail/DetailHotHashtag';
import DetailMain from '@/components/detail/main/DetailMain';
import DetailNavbar from '@/components/detail/DetailNavbar';
import { getBoard } from '@/service/board';
import { DetailNewData } from '@/utils/utilFunc';
import { constSelector } from 'recoil';

interface DetailPageProps {
  params: {
    slug: string;
  };
}

const DetailPage = async ({ params }: DetailPageProps) => {
  const { slug: postId } = params;
  const detailData = await getBoard(postId);
  const newData = detailData && DetailNewData(detailData);
  return (
    <section className="w-full max-w-md h-screen relative">
      {newData && (
        <>
          <DetailHeader data={newData.headerData} />
          <DetailMain data={newData.mainData} />
          <DetailComment postId={postId} />
          <DetailHotHashtag
            mainPostId={Number(postId)}
            data={newData.hotTagData}
          />
        </>
      )}
      <DetailNavbar postId={postId} />
      <div className="flex w-full h-16"></div>
    </section>
  );
};

export default DetailPage;

//
