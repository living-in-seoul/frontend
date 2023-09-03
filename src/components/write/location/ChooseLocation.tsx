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
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Button from '../../common/Button';
import SelectedLocation from './SelectedLocation';
import toast, { Toaster } from 'react-hot-toast';
import { PinIcon } from '@/components/profile/editpage/EditImageIcon';
import CustomOverlayMarker from '@/components/map/marker/CustomOverlayMarker';

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
  const [placeId, setPlaceId] = useRecoilState(placeIdState);
  const [detail, setDetail] = useRecoilState(detailState);
  const { map, onLoad, onUnmount } = useMapInstance();
  const [polygonValue, setPolygonState] = useRecoilState(polygonState);
  const [formData, setFormData] = useRecoilState(formDataState);
  const [disable, setDisable] = useState(false);
  const [center, setCenter] = useRecoilState(centerState);
  const [showMarker, setShowMarker] = useState(false);
  const currentValue = useRecoilValue(currentState);
  const { data } = useSWR<PlaceByPlaceIdResponse>(
    placeId && `/api/map/place/${placeId}`,
  );

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

  useEffect(() => {
    const gu = polygonValue.gu;
    if (!gu) {
      toast.error('서울 지역으로 선택해주세요.');
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [polygonValue.gu]);

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
    setShowMarker(false);
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

  const onClickToToggle = () => {
    setPlaceId('');
    setDetail(null);
    setShowMarker(!showMarker);
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
      <div className="w-full flex justify-start items-center px-6 py-4 gap-4">
        <Icons path={back} onClick={onClose} />
        <h1 className="font-semibold">위치 선택</h1>
      </div>
      <div className="relative flex justify-center items-center mt-5 w-full px-2">
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
          <>
            <MarkerF
              icon={{
                url: '/marker/marker.webp',
                scaledSize: new window.google.maps.Size(40, 50),
              }}
              position={center}
            />
            <CustomOverlayMarker
              position={center}
              text={detail?.name ?? '선택'}
              onWrite={true}
            />
          </>
        )}
        {currentValue && (
          <MarkerF
            icon={{
              url: '/marker/current.webp',
              scaledSize: new window.google.maps.Size(40, 50),
            }}
            position={currentValue}
          />
        )}
      </GoogleMap>
      {!placeId && showMarker && (
        <img
          src="/marker/marker.webp"
          className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[34px] h-[43px]"
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
            bgColor="bg-primary"
            textColor="text-white"
            onClick={onClickToSelect}
            disable={disable}
          />
        </div>
      </div>
      <div className="absolute bottom-24 right-5 z-10">
        <div
          className="w-12 h-12 flex justify-center items-center bg-white rounded-full shadow-md hover:cursor-pointer mb-5"
          onClick={onClickToToggle}
        >
          {PinIcon()}
        </div>
        <div onClick={onClickCurrent}>
          <CurrentLocation />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ChooseLocation;
