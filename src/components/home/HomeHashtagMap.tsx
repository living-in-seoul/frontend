'use client';
import { mapOptions } from '@/utils/constants/constants';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { memo } from 'react';

interface HomeHashtagMap {
  location: PostLocation;
}

const HomeHashtagMap = ({ location }: HomeHashtagMap) => {
  return (
    <section className="relative w-full h-[260px] border overflow-hidden rounded-xl">
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '260px',
        }}
        zoom={14}
        center={new google.maps.LatLng(location.lat, location.lng)}
        options={{
          ...mapOptions,
        }}
        onMouseDown={(e) => e.stop()}
      >
        <MarkerF
          icon={{ url: '/marker/HomeMarkers.png' }}
          position={new google.maps.LatLng(location.lat, location.lng)}
        />
      </GoogleMap>
    </section>
  );
};
export default memo(HomeHashtagMap);
