import Modal from '@/components/layouts/Modal';
import SearchComponent from '@/components/search/SearchComponent';
interface PageProps {
  searchParams: { [key: string]: string | undefined };
}
const SearchPage = ({ searchParams }: PageProps) => {
  console.log(searchParams);
  const search = searchParams.search || '';
  return (
    <Modal>
      <SearchComponent category={searchParams.category || ''} search={search} />
    </Modal>
  );
};
export default SearchPage;
