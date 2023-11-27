/* eslint-disable @next/next/no-img-element */
'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useMapInstance from '@/hooks/useMapInstance';
import { GoogleMap, MarkerF, PolygonF } from '@react-google-maps/api';
import toast from 'react-hot-toast';
import {
  boardListState,
  currentState,
  filterOptionState,
  markerIdState,
  polygonState,
  postSizeState,
} from '@/recoil/mapStates';
import { communityKeyState } from '@/recoil/communityStates';
import usePosts from '@/hooks/usePosts';
import CustomOverlayMarker from './marker/CustomOverlayMarker';
import {
  CommContainerStyle,
  mapOptions,
  seoulCenterCoords,
} from '@/utils/constants/constants';
import { bottomSheetState } from '@/recoil/bottomsheet';
import Button from '../common/Button';
import { transformCoordinates } from '@/utils/utilFunc';

const CommunityMap = () => {
  const { map, onLoad, onUnmount } = useMapInstance();
  const { posts: boardList } = usePosts(communityKeyState);
  const [polygonValue, setPolygonState] = useRecoilState(polygonState);
  const filterOption = useRecoilValue(filterOptionState);
  const [currentValue, setCurrent] = useRecoilState(currentState);
  const setPostSize = useSetRecoilState(postSizeState);
  const setMarkerId = useSetRecoilState(markerIdState);
  const setBoardListState = useSetRecoilState(boardListState);
  const setCommunityKey = useSetRecoilState(communityKeyState);
  const setBottomSheetState = useSetRecoilState(bottomSheetState);
  const [center, setCenter] = useState<LatLng | null | undefined>(null);
  const [geometry, setGeometry] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const openMapBottomSheet = useCallback(() => {
    setBottomSheetState({ isActive: true, type: 'map', link: null });
  }, [setBottomSheetState]);

  useEffect(() => {
    const getCenter = () => {
      const gu =
        (localStorage.getItem('location_gu') as guchung) ?? polygonValue.gu;
      if (gu && seoulCenterCoords.hasOwnProperty(gu)) {
        setCenter(seoulCenterCoords[gu]);
      }
    };
    getCenter();
  }, []);

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

    if (boardList && gu) setPostSize(length);
    if (!gu && boardList) {
      toast(
        (t) => (
          <div className="flex justify-center items-center gap-2">
            <span className="text-xs">서울 지역 내에서만 선택 가능합니다.</span>
            <div className=" w-10">
              <Button
                size="full"
                onClick={() => {
                  setCenter({ lat: 37.495985, lng: 127.066409 });
                  setCurrent({ lat: 0, lng: 0 });
                  toast.dismiss(t.id);
                }}
                textColor="text-primary"
                title="이동"
                className="text-sm"
              />
            </div>
          </div>
        ),
        {
          icon: '❕',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardList]);

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

  const onMouseUpHandler = useCallback(async () => {
    const lat = map.getCenter().lat();
    const lng = map.getCenter().lng();
    try {
      const res = await fetch(`/api/map/geo?lat=${lat}&lng=${lng}`, {
        method: 'GET',
      });
      const location = await res.json();
      setPolygonState({ gu: location.gu, dong: location.dong });
      const formattedCoordinates = transformCoordinates(location.geometry);
      setGeometry(formattedCoordinates);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [map, setPolygonState]);

  return (
    <section className="w-full h-full relative z-0">
      <GoogleMap
        mapContainerStyle={CommContainerStyle}
        center={center ?? undefined}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
        onDragEnd={onMouseUpHandler}
        // onMouseUp={onMouseUpHandler}
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
        {geometry && (
          <PolygonF
            paths={geometry}
            options={{
              fillOpacity: 0.05,
              strokeColor: '#555555',
              strokeOpacity: 1,
              strokeWeight: 2,
            }}
          />
        )}
      </GoogleMap>
      <img
        src="/marker/marker.webp"
        className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-[34px] h-[43px]"
        alt="Center Marker"
      />
    </section>
  );
};

export default CommunityMap;
