'use client';

import { GoogleMap, MarkerF } from '@react-google-maps/api';
import PlacesAutoComplete from '../../map/search/PlacesAutoComplete';
import Icons from '../../common/Icons';
import { back } from '@/utils/Icon';
import { useRecoilState, useRecoilValue } from 'recoil';
import { formDataState } from '@/recoil/BoardStates';
import CurrentLocation from '../../map/actions/CurrentLocation';
import {
  centerState,
  currentState,
  detailState,
  placeIdState,
} from '@/recoil/mapStates';
import useMapInstance from '@/hooks/useMapInstance';
import { MapStyleVersionTwo } from '@/utils/styles';
import { useEffect } from 'react';
import useSWR from 'swr';
import Button from '../../common/Button';
import SelectedLocation from './SelectedLocation';

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

const containerStyleForMap = { width: '100%', height: '90%' };

const ChooseLocation = ({ onClose }: ChooseLocationProps) => {
  const placeId = useRecoilValue(placeIdState);
  const [detail, setDetail] = useRecoilState(detailState);
  const { map, onLoad, onUnmount } = useMapInstance();
  const [formData, setFormData] = useRecoilState(formDataState);
  const [center, setCenter] = useRecoilState(centerState);
  const currentValue = useRecoilValue(currentState);
  const { data } = useSWR<PlaceByPlaceIdResponse>(
    placeId && `/api/map/place/${placeId}`,
  );

  const onClickMap = (e: google.maps.MapMouseEvent) => {
    console.log('Sss');
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setFormData((prev) => ({ ...prev, lat, lng }));
      setCenter({ lat, lng });
    }
  };

  useEffect(() => {
    if (data && data.result.geometry?.location) {
      setDetail(data.result);
      setCenter(data.result.geometry.location);
    }
  }, [data, detail, setCenter, setDetail]);

  useEffect(() => {
    if (map && center) {
      map.panTo(center);
    }
  }, [map, center]);

  const onClickToSelect = () => {
    setFormData((prev) => ({
      ...prev,
      lat: Number(center.lat),
      lng: Number(center.lng),
    }));
    console.log(formData);
    onClose();
  };

  const onClickCurrent = () => {
    setCenter(currentValue);
  };

  return (
    <div className="flex flex-col absolute top-0 w-[100%] h-[100vh] bg-white">
      <div className="w-full h-24 flex justify-start items-center px-6 gap-5">
        <Icons path={back} onClick={onClose} />
        <h1 className="font-semibold">위치 선택</h1>
      </div>
      <div className="relative flex justify-center items-center mt-5 pb-5">
        <PlacesAutoComplete />
      </div>
      <div className="h-[70%] w-full relative ">
        <GoogleMap
          onClick={(e) => onClickMap(e)}
          mapContainerStyle={containerStyleForMap}
          center={center}
          zoom={18}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            ...mapOptions,
          }}
        >
          <MarkerF icon={{ url: '/marker/base.png' }} position={center} />
          {currentValue && <MarkerF position={currentValue} />}
        </GoogleMap>
        <div className="flex justify-between items-center px-6 h-[15%] shadow-2xl">
          <div className=" w-4/6">
            <SelectedLocation />
          </div>
          <div className=" h-8 mt-1 w-1/6">
            <Button
              size="full"
              title="선택"
              bgColor="bg-neutral-600"
              onClick={onClickToSelect}
            />
          </div>
        </div>
        <div className="absolute bottom-9 right-5 z-10">
          <div onClick={onClickCurrent}>
            <CurrentLocation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseLocation;
