import SearchComponent from '@/components/search/SearchComponent';
import SearchHashTagAlert from '@/components/search/SearchHashTagAlert';

interface PageProps {
  searchParams: { [key: string]: string | undefined };
}
const SearchPage = ({ searchParams }: PageProps) => {
  const search = searchParams.search || '';
  const category = searchParams.category || '';
  return (
    <section>
      <SearchComponent search={search} category={category} />
      {search && <SearchHashTagAlert hashTag={search} />}
    </section>
  );
};
export default SearchPage;
