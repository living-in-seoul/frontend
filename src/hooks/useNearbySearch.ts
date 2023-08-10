import { GoogleMap } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

interface NearbySearchProps {
  map: HTMLDivElement | google.maps.Map | null;
  center: LatLng;
  radius: number;
  types: string[];
}

const useNearbySearch = ({ map, center, radius, types }: NearbySearchProps) => {
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[]>([]);

  useEffect(() => {
    if (map) {
      const service = new window.google.maps.places.PlacesService(map);
      const request: RequestPlaces = {
        location: center,
        radius: radius,
        types: types,
      };
      service.nearbySearch(request, (results, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          results
        ) {
          setPlaces(results);
        }
      });
    }
  }, [map, center, radius, types]);

  return { places };
};

export default useNearbySearch;
