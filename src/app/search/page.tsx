import SearchComponent from '@/components/search/SearchComponent';
import SearchHashTagAlert from '@/components/search/SearchHashTagAlert';
import { Suspense } from 'react';

interface PageProps {
  searchParams: { [key: string]: string | undefined };
}
const SearchPage = ({ searchParams }: PageProps) => {
  const search = searchParams.search || '';
  const category = searchParams.category || '';
  return (
    <section>
      <Suspense fallback={<>loading...</>}>
        <SearchComponent search={search} category={category} />
      </Suspense>
      {search && <SearchHashTagAlert hashTag={search} />}
    </section>
  );
};
export default SearchPage;
