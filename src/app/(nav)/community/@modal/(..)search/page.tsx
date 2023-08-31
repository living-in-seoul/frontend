import Modal from '@/components/layouts/Modal';
import SearchComponent from '@/components/search/SearchComponent';
import dynamic from 'next/dynamic';

const DynamicSearchComponent = dynamic(
  () => import('@/components/search/SearchComponent'),
  {
    loading: () => <div>Loading...</div>,
  },
);
interface PageProps {
  searchParams: { [key: string]: string | undefined };
}
const SearchPage = ({ searchParams }: PageProps) => {
  console.log(searchParams);
  const search = searchParams.search || '';
  return (
    <Modal>
      <DynamicSearchComponent
        category={searchParams.category || ''}
        search={search}
      />
    </Modal>
  );
};
export default SearchPage;
