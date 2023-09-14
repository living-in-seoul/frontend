import DetailComment from '@/components/detail/comment/DetailComment';
import DetailHeader from '@/components/detail/DetailHeader';
import DetailHotHashtag from '@/components/detail/DetailHotHashtag';
import DetailMain from '@/components/detail/main/DetailMain';
import DetailNavbar from '@/components/detail/DetailNavbar';
import BeatLoader from '@/components/common/Spinner';
import { getUserBoard } from '@/service/board';
import { Metadata } from 'next';
interface DetailPageProps {
  params: {
    slug: string;
  };
}
export const generateMetadata = async ({
  params,
}: DetailPageProps): Promise<Metadata> => {
  const { slug: postId } = params;
  const product = await getUserBoard(postId);
  const title = product?.result.post.category;
  const description = product?.result.post.content;
  return {
    title,
    description,
  };
};

const DetailPage = async ({ params }: DetailPageProps) => {
  const { slug: postId } = params;
  const data = await getUserBoard(postId);

  return (
    <section className="w-full max-w-2md h-screen relative">
      {data ? (
        <>
          <DetailHeader data={data} />
          <DetailMain data={data} postId={postId} />
          <DetailComment postId={postId} />
          <DetailHotHashtag data={data} />
        </>
      ) : (
        <div className="flex h-screen justify-center items-center">
          <BeatLoader />
        </div>
      )}
      <DetailNavbar postId={postId} />
      <div className="flex w-full h-16"></div>
      <div id="detailPortal" />
    </section>
  );
};

export default DetailPage;

//
