'use client';
import { useRouter } from 'next/navigation';

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
  return <div>MapRedirectPage</div>;
};

export default MapRedirectPage;
