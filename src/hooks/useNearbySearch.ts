import { Filters } from '@/components/map/constants';
import { useEffect, useState } from 'react';

interface NearbySearchProps {
  map: HTMLDivElement | google.maps.Map | null;
  center: LatLng;
  radius: number;
  type: string;
}

const useNearbySearch = ({ map, center, radius, type }: NearbySearchProps) => {
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);

  useEffect(() => {
    if (map) {
      const service = new window.google.maps.places.PlacesService(map);
      const request: google.maps.places.PlaceSearchRequest = {
        location: center,
        radius: radius,
        type: Filters.find((filter) => type === filter.name)?.category,
      };
      service.nearbySearch(request, (results, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          results
        ) {
          results.shift();
          setPlaces(results);
        }
      });
    }
  }, [center, map, radius, type]);

  return { places };
};

export default useNearbySearch;
