import DetailMainProfile from './DetailMainProfile';
import DetailMainContents from './DetailMainContents';
import DetailMainTags from './DetailMainTags';
import DetailButtons from './DetailButtons';

const DetailMain = ({ data }: { data: ResponseDetailData }) => {
  return (
    <section className="flex flex-col gap-6 py-6 border-b-2  px-4">
      <DetailMainProfile data={data} />
      <DetailMainContents data={data} />
      <DetailMainTags data={data} />
      <DetailButtons data={data} />
    </section>
  );
};

export default DetailMain;

// userProfile 만듦 은석님한테 이걸로 바꿔도 괜찮을 것 같다고 애기하기
