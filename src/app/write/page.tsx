import Back from '@/components/common/Back';
import Header from '@/components/layouts/Header';
import WriteContent from '@/components/write/WriteContent';
import WriteHeaderButton from '@/components/write/WriteHeaderButtons';

const WritePage = () => {
  return (
    <section className="relative">
      <Header
        left={<Back />}
        center={
          <span className="text-[1.1rem] font-semibold">글 작성하기</span>
        }
        right={<WriteHeaderButton />}
        className=""
      />
      <WriteContent />
    </section>
  );
};

export default WritePage;
