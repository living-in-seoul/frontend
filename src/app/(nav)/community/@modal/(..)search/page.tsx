import Modal from '@/components/layouts/Modal';
import SearchHashTagAlert from '@/components/search/SearchHashTagAlert';
import dynamic from 'next/dynamic';

const DynamicSearchComponent = dynamic(
  () => import('@/components/search/SearchComponent'),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  },
);
interface PageProps {
  searchParams: { [key: string]: string | undefined };
}
const SearchPage = ({ searchParams }: PageProps) => {
  const search = searchParams.search || '';
  return (
    <>
      <Modal>
        <DynamicSearchComponent
          category={searchParams.category || ''}
          search={search}
        />
      </Modal>
      {search && <SearchHashTagAlert hashTag={search} />}
    </>
  );
};
export default SearchPage;
