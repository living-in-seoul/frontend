import SearchComponent from '@/components/community/SearchComponent';
import Modal from '@/components/layouts/Modal';
interface PageProps {
  searchParams: { [key: string]: string | undefined };
}
const SearchPage = ({ searchParams }: PageProps) => {
  console.log(searchParams);
  const search = searchParams.search || '';
  return (
    <Modal>
      <SearchComponent search={search} />
    </Modal>
  );
};
export default SearchPage;
