import HashtagAccount from '@/components/alert/hashtag/HashtagAccount';
import HashtagInsert from '@/components/alert/hashtag/HashtagInsert';

const HashTagPage = () => {
  return (
    <section className="flex flex-col relative w-full pt-5 px-4">
      <HashtagAccount />
      <HashtagInsert />
    </section>
  );
};
export default HashTagPage;
