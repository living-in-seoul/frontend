import Link from 'next/link';

const RecommendItem = (place: google.maps.places.PlaceResult) => {
  const { name, place_id } = place;
  return (
    <div>
      <Link href={`/map/${place_id}`}>{name}</Link>
    </div>
  );
};

export default RecommendItem;
