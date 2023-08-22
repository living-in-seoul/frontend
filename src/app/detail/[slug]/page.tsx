interface DetailPageProps {
  params: {
    slug: string;
  };
}

const DetailPage = ({ params }: DetailPageProps) => {
  const { slug: postId } = params;
  return <div>{postId}</div>;
};

export default DetailPage;
