/* eslint-disable @next/next/no-img-element */
'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useMapInstance from '@/hooks/useMapInstance';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import toast, { Toaster } from 'react-hot-toast';
import {
  boardListState,
  currentState,
  filterOptionState,
  markerIdState,
  polygonState,
} from '@/recoil/mapStates';
import { communityKeyState } from '@/recoil/communityStates';
import usePosts from '@/hooks/usePosts';
import CustomOverlayMarker from './marker/CustomOverlayMarker';
import {
  CommContainerStyle,
  mapOptions,
  seoulCenterCoords,
} from '@/utils/constants/constants';
import { bottomSheetState, mapBottomSheetState } from '@/recoil/bottomsheet';
import Button from '../common/Button';
import { useMapCenter } from '@/hooks/useMapCenter';

const CommunityMap = () => {
  const { map, onLoad, onUnmount } = useMapInstance();
  const setisBottomSheetState = useSetRecoilState(mapBottomSheetState);
  const { posts: boardList } = usePosts(communityKeyState);
  const [polygonValue, setPolygonState] = useRecoilState(polygonState);
  const [center, setCenter] = useMapCenter(polygonValue, seoulCenterCoords);
  const filterOption = useRecoilValue(filterOptionState);
  const currentValue = useRecoilValue(currentState);
  const setMarkerId = useSetRecoilState(markerIdState);
  const setBoardListState = useSetRecoilState(boardListState);
  const setCommunityKey = useSetRecoilState(communityKeyState);
  const setBottomSheetState = useSetRecoilState(bottomSheetState);
  /** 모달오픈 */
  const openMapBottomSheet = useCallback(() => {
    setBottomSheetState({ isActive: true, type: 'map', link: null });
  }, [setBottomSheetState]);
  //로컬스토리지 여기서 잠깐 저장좀
  localStorage.setItem('location', '강남구');

  useEffect(() => {
    const gu = polygonValue.gu;
    setCommunityKey(
      `/api/map/category?category=${filterOption}&gu=${encodeURIComponent(gu)}`,
    );
    localStorage.setItem('lastVisited', polygonValue.gu);
  }, [boardList, filterOption, polygonValue.gu, setCommunityKey]);

  useEffect(() => {
    const gu = polygonValue.gu;
    const length = boardList?.pageable.totalElements ?? 0;

    boardList &&
      gu &&
      toast(`${gu} ${length}건`, {
        icon: '📍',
      });

    if (!gu) {
      toast((t) => (
        <div className="flex justify-center items-center gap-2">
          <span className="text-xs">서울 지역으로 이동해주세요.</span>
          <div className=" w-10">
            <Button
              size="full"
              onClick={() => {
                setCenter({ lat: 37.495985, lng: 127.066409 });
                toast.dismiss(t.id);
              }}
              bgColor="bg-primary"
              textColor="text-white"
              title="이동"
              className="text-sm"
            />
          </div>
        </div>
      ));
    }
    console.log(boardList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [polygonValue.gu]);

  useEffect(() => {
    if (boardList) setBoardListState(boardList);
    if (currentValue.lat !== 0) setCenter(currentValue);
  }, [boardList, currentValue, filterOption, setBoardListState, setCenter]);

  useEffect(() => {
    if (map && center) {
      map.panTo(center);
    }
  }, [map, center]);

  const onClickMarker = useCallback(
    (_: google.maps.event, postId: number, latlng: LatLng) => {
      setMarkerId(postId);
      setCenter(latlng);
      openMapBottomSheet();
    },
    [openMapBottomSheet, setMarkerId],
  );

  const onMouseUpHandler = async () => {
    const lat = map?.getCenter()?.lat();
    const lng = map?.getCenter()?.lng();
    const res = await fetch(`/api/map/geo?lat=${lat}&lng=${lng}`, {
      method: 'GET',
    }).then((data) => data.json());
    setPolygonState(res);
  };

  return (
    <section className="w-full h-full relative z-100">
      <GoogleMap
        mapContainerStyle={CommContainerStyle}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
        onMouseUp={onMouseUpHandler}
        onClick={(e) => {
          e.stop();
        }}
      >
        <>
          {currentValue && (
            <MarkerF
              icon={{
                url: '/marker/marker.webp',
                scaledSize: new window.google.maps.Size(40, 50),
              }}
              position={currentValue}
            />
          )}
          {boardList?.result.map((post: ResponsePost) => {
            const { postId, hashtag } = post.post;
            const latlng = {
              lat: post.location.lat,
              lng: post.location.lng,
            };
            return (
              <div className="z-100 cursor-pointer" key={postId}>
                <CustomOverlayMarker
                  position={latlng}
                  text={`#${hashtag?.split('#')[1]}`}
                  onClick={(e: google.maps.event) => {
                    onClickMarker(e, postId, latlng);
                  }}
                />
              </div>
            );
          })}
        </>
      </GoogleMap>
      <img
        src="/marker/marker.webp"
        className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[34px] h-[43px]"
        alt="Center Marker"
      />
      <Toaster position="bottom-center" />
    </section>
  );
};

export default CommunityMap;
