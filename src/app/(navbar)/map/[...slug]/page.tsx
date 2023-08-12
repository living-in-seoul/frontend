'use client';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import PlacesAutoComplete from '@/components/map/search/PlacesAutoComplete';
const DynamicMap = dynamic(() => import('../../../../components/map/Map'), {
  ssr: true,
});

interface MapDetailProps {
  params: {
    slug: string[];
  };
}
const MapRedirectPage = ({ params }: MapDetailProps) => {
  const {
    slug: [place, placeId],
  } = params;
  const router = useRouter();
  console.log(place, placeId);

  router.push(`/place/${placeId}/2`);

  // redirect(`/place/${placeId}`);
  return (
    <section className=" w-full h-full">
      <PlacesAutoComplete />
      <DynamicMap />
    </section>
  );
};

export default MapRedirectPage;
