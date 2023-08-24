import DetailComment from '@/components/detail/DetailComment';
import DetailHeader from '@/components/detail/DetailHeader';
import DetailHotHashtag from '@/components/detail/DetailHotHashtag';
import DetailMain from '@/components/detail/DetailMain';
import DetailNavbar from '@/components/detail/DetailNavbar';
import { DetailNewData } from '@/utils/utilFunc';

interface DetailPageProps {
  params: {
    slug: string;
  };
}

const DetailPage = async ({ params }: DetailPageProps) => {
  const { slug: postId } = params;
  const detailData = await fetch(
    `https://seoulvival.com:8080/posts/get/${postId}`,
    { next: { revalidate: 2000 } },
  ).then<ResponseDetailData>((res) => res.json());
  const newData = DetailNewData(detailData);
  return (
    <section className="w-full max-w-md h-screen relative">
      <DetailHeader data={newData.headerData} />
      <DetailMain data={newData.mainData} />
      <DetailComment data={newData.commentData} />
      <DetailHotHashtag data={newData.hotTagData} />
      <DetailNavbar postId={postId} />
      <div className="flex w-full h-16"></div>
    </section>
  );
};

export default DetailPage;

//
