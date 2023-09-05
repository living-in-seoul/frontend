import { useEffect, useState } from 'react';

export const useMapCenter = (
  polygonValue: Gudong,
  seoulCenterCoords: Partial<SeoulCoords>,
) => {
  const [center, setCenter] = useState<LatLng | null | undefined>(null);

  useEffect(() => {
    const getCenter = () => {
      const gu =
        (localStorage.getItem('location_gu') as guchung) ?? polygonValue.gu;
      if (gu && seoulCenterCoords.hasOwnProperty(gu)) {
        setCenter(seoulCenterCoords[gu]);
      }
    };
    getCenter();
  }, [polygonValue.gu, seoulCenterCoords]);

  return [center, setCenter];
};
