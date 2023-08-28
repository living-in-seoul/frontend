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

const containerStyleForMap = { width: '100%', height: '100%' };

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

  useEffect(() => {
    if (data && data.result.geometry?.location) {
      const newCenter = {
        lat: data.result.geometry.location.lat,
        lng: data.result.geometry.location.lng,
      };
      setDetail(data.result);
      setCenter(newCenter);
    }
    console.log(data);
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
      gu: data?.result.formatted_address?.split(' ')[2] ?? '',
      lname: data?.result.name ?? '',
      address: data?.result.formatted_address ?? '',
    }));
    console.log(formData);
    onClose();
  };

  const onClickCurrent = () => {
    setCenter(currentValue);
    setFormData((prev) => ({
      ...prev,
      lat: Number(center.lat),
      lng: Number(center.lng),
    }));
  };

  return (
    <div className="flex flex-col justify-center  absolute top-0 w-full h-full bg-white">
      <div className="w-full flex justify-start items-center px-6 gap-5">
        <Icons path={back} onClick={onClose} />
        <h1 className="font-semibold">위치 선택</h1>
      </div>
      <div className="relative flex justify-center items-center mt-5 pb-5">
        <PlacesAutoComplete />
      </div>
      <GoogleMap
        mapContainerStyle={containerStyleForMap}
        center={center}
        zoom={11}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          ...mapOptions,
        }}
      >
        {placeId && (
          <MarkerF icon={{ url: '/marker/base.png' }} position={center} />
        )}
        {currentValue && <MarkerF position={currentValue} />}
      </GoogleMap>
      <div className="flex justify-between items-center px-6 pt-5 ">
        <div className="w-4/6">
          <SelectedLocation />
        </div>
        <div className=" h-9 mt-1 w-1/6">
          <Button
            size="full"
            title="선택"
            bgColor="bg-neutral-600"
            onClick={onClickToSelect}
          />
        </div>
      </div>
      <div className="absolute bottom-24 right-5 z-10">
        <div onClick={onClickCurrent}>
          <CurrentLocation />
        </div>
      </div>
    </div>
  );
};

export default ChooseLocation;
