import PostItem from '../community/PostItem';
interface DetailHotHashtagProps {
  tag: string;
  category: string;
}
const DetailHotHashtag = async ({ data }: { data: DetailHotHashtagProps }) => {
  const { category, tag } = data;
  const hotTagData = await fetch(
    `https://seoulvival.com:8080/tags/post/category?size=2&page=1&hashtagName=%23${tag}&category=${category}&type=popular`,
    { next: { revalidate: 2000 } },
  ).then<ResponsePopularCategoryHashtag>((res) => res.json());
  return (
    <div>
      <span className="flex pt-6 font-semibold px-4">관련 해시태그 인기글</span>
      {hotTagData &&
        hotTagData.result.map((data, index) => (
          <PostItem
            key={index}
            location={data.location}
            post={data.post}
            user={data.user}
          />
        ))}
    </div>
  );
};

export default DetailHotHashtag;
