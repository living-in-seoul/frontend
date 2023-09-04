'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useMapInstance from '@/hooks/useMapInstance';
import { GoogleMap } from '@react-google-maps/api';
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
import { mapBottomSheetState } from '@/recoil/bottomsheet';
import Button from '../common/Button';

const CommunityMap = () => {
  const { map, onLoad, onUnmount } = useMapInstance();
  const setisBottomSheetState = useSetRecoilState(mapBottomSheetState);
  const [center, setCenter] = useState<LatLng | null | undefined>(null);
  const { posts: boardList } = usePosts(communityKeyState);
  const [polygonValue, setPolygonState] = useRecoilState(polygonState);
  const filterOption = useRecoilValue(filterOptionState);
  const currentValue = useRecoilValue(currentState);
  const setMarkerId = useSetRecoilState(markerIdState);
  const setBoardListState = useSetRecoilState(boardListState);
  const setCommunityKey = useSetRecoilState(communityKeyState);

  useEffect(() => {
    const getCenter = () => {
      const gu =
        (localStorage.getItem('location_gu') as guchung) ?? polygonValue.gu;
      if (gu && seoulCenterCoords.hasOwnProperty(gu)) {
        setCenter(seoulCenterCoords[gu]);
      }
    };
    getCenter();
  }, [polygonValue.gu]);

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
      setisBottomSheetState(true);
    },
    [setMarkerId, setisBottomSheetState],
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
        center={center ?? undefined}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
        onMouseUp={onMouseUpHandler}
        onClick={(e) => {
          e.stop();
        }}
      >
        <>
          {/* <MarkerF position={currentValue} /> */}
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
      <Toaster position="bottom-center" />
    </section>
  );
};

export default CommunityMap;
