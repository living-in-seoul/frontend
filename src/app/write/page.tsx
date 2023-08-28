import WriteContent from '@/components/write/WriteContent';
import WriteHeader from '@/components/write/WriteHeader';

const WritePage = () => {
  return (
    <section className="relative">
      <WriteHeader />
      <WriteContent />
    </section>
  );
};

export default WritePage;
