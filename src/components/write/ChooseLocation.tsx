'use client';

import { GoogleMap, MarkerF } from '@react-google-maps/api';
import PlacesAutoComplete from '../map/search/PlacesAutoComplete';
import Icons from '../common/Icons';
import { back } from '@/utils/Icon';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { formDataState } from '@/recoil/BoardStates';
import CurrentLocation from '../map/actions/CurrentLocation';
import { centerState, currentState, placeIdState } from '@/recoil/mapStates';
import useMapInstance from '@/hooks/useMapInstance';
import { MapStyleVersionTwo } from '@/utils/styles';
import { FormProvider } from 'react-hook-form';

interface ChooseLocationProps {
  onClose: () => void;
}

const mapOptions: google.maps.MapOptions = {
  fullscreenControl: true,
  gestureHandling: 'greedy',
  disableDoubleClickZoom: true,
  disableDefaultUI: true,
  styles: MapStyleVersionTwo,
};

const containerStyleForMap = { width: '100%', height: '65vh' };

const ChooseLocation = ({ onClose }: ChooseLocationProps) => {
  const [placeId, setPlaceId] = useRecoilState(placeIdState);
  const { onLoad, onUnmount } = useMapInstance();
  const [formData, setFormData] = useRecoilState(formDataState);
  const [centerValue, setCenter] = useRecoilState(centerState);
  const currentValue = useRecoilValue(currentState);

  const onClickMap = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setFormData((prev) => ({ ...prev, lat, lng }));
      setCenter({ lat, lng });
      console.log(`latitude: ${lat}, longitude: ${lng}`);
    }
  };

  return (
    <div className="flex flex-col absolute top-0 w-[100%] h-[100%] bg-white">
      <div className="w-full h-24 flex justify-start items-center px-6 gap-5">
        <Icons path={back} onClick={onClose} />
        <h1 className="font-semibold">위치 선택</h1>
      </div>
      <div className="relative flex justify-center items-center  pb-5">
        {/* //검색창을 꼭 해야할까..? 핀찍기랑 둘 중 하나만 어떠실지*/}
        <PlacesAutoComplete />
      </div>
      <div className="h-full w-full relative">
        <GoogleMap
          onClick={(e) => onClickMap(e)}
          mapContainerStyle={containerStyleForMap}
          center={centerValue}
          zoom={18}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            ...mapOptions,
          }}
        >
          {formData.lat && formData.lng && (
            <MarkerF
              position={{
                lat: formData.lat,
                lng: formData.lng,
              }}
            />
          )}
          {currentValue && <MarkerF position={currentValue} />}
        </GoogleMap>
        <div className="absolute bottom-32 right-5 z-10">
          <CurrentLocation />
        </div>
      </div>
    </div>
  );
};

export default ChooseLocation;
