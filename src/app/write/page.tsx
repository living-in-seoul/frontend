import WriteContent from '@/components/write/WriteContent';
import WriteHeader from '@/components/write/WriteHeader';
import WriteTags from '@/components/write/WriteTags';

const WritePage = () => {
  return (
    <section>
      <WriteHeader />
      <WriteContent />
      <WriteTags />
    </section>
  );
};

export default WritePage;
