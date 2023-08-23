import DetailMainProfile from './DetailMainProfile';
import DetailMainContents from './DetailMainContents';

export interface DetailMainProps extends Post {
  nickname: string;
  hasLiked: boolean;
}

const DetailMain = ({ data }: { data: DetailMainProps }) => {
  return (
    <section>
      <DetailMainProfile data={data} />
      <DetailMainContents data={data} />
    </section>
  );
};

export default DetailMain;

// userProfile 만듦 은석님한테 이걸로 바꿔도 괜찮을 것 같다고 애기하기
