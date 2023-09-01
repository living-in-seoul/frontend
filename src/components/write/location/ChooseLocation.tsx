/* eslint-disable @next/next/no-img-element */
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
  polygonState,
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
  const [polygonValue, setPolygonState] = useRecoilState(polygonState);
  const [formData, setFormData] = useRecoilState(formDataState);
  const [center, setCenter] = useRecoilState(centerState);
  const currentValue = useRecoilValue(currentState);
  const { data } = useSWR<PlaceByPlaceIdResponse>(
    placeId && `/api/map/place/${placeId}`,
  );
  console.log(polygonValue);

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
    if (data?.result) {
      setFormData((prev) => ({
        ...prev,
        lat: Number(center.lat),
        lng: Number(center.lng),
        gu: data?.result.formatted_address?.split(' ')[2] ?? polygonValue.gu,
        lname: data?.result.name ?? `${polygonValue.gu} ${polygonValue.dong}`,
        address:
          data?.result.formatted_address ??
          `${polygonValue.gu} ${polygonValue.dong}`,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        lat: Number(map?.getCenter()?.lat()),
        lng: Number(map?.getCenter()?.lng()),
        gu: polygonValue.gu,
        lname: `${polygonValue.gu} ${polygonValue.dong}`,
        address: `${polygonValue.gu} ${polygonValue.dong}`,
      }));
    }
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

  const onMouseUpHandler = async () => {
    const lat = map?.getCenter()?.lat();
    const lng = map?.getCenter()?.lng();
    const res = await fetch(`/api/map/geo?lat=${lat}&lng=${lng}`, {
      method: 'GET',
    }).then((data) => data.json());
    setPolygonState(res);
  };

  return (
    <div className="flex flex-col justify-center  absolute top-0 w-full h-full bg-white">
      <div className="w-full flex justify-start items-center px-6 gap-5">
        <Icons path={back} onClick={onClose} />
        <h1 className="font-semibold">위치 선택</h1>
      </div>
      <div className="relative flex justify-center items-center mt-5 pb-5 w-[80%] mx-auto">
        <PlacesAutoComplete />
      </div>
      <GoogleMap
        mapContainerStyle={containerStyleForMap}
        center={center}
        zoom={11}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onMouseUp={onMouseUpHandler}
        options={{
          ...mapOptions,
        }}
      >
        {placeId && (
          <MarkerF icon={{ url: '/marker/base.png' }} position={center} />
        )}
        {currentValue && <MarkerF position={currentValue} />}
      </GoogleMap>
      {/* 검색 후에 찍히는 마커가 생겨서 -> 마커 두개 겹칠거같아서 검색 이후에는 센터마커 없앰 */}
      {!placeId && (
        <img
          src="/marker/mainMarker.png"
          className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
          alt="Center Marker"
        />
      )}
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
