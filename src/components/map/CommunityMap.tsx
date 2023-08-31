//현위치로 center 갈 때 header 안 바뀌는거 괜찮나?

'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useMapInstance from '@/hooks/useMapInstance';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import {
  boardListState,
  currentState,
  filterOptionState,
  markerIdState,
  polygonState,
} from '@/recoil/mapStates';
import {
  communityKeyState,
  isBottomSheetState,
} from '@/recoil/communityStates';
import usePosts from '@/hooks/usePosts';
import CustomOverlayMarker from './marker/CustomOverlayMarker';
import {
  CommContainerStyle,
  mapOptions,
  seoulCenterCoords,
} from '@/utils/constants/constants';

const CommunityMap = () => {
  const { map, onLoad, onUnmount } = useMapInstance();
  const [isBottomSheetOpen, setisBottomSheetState] =
    useRecoilState(isBottomSheetState);
  const [center, setCenter] = useState<LatLng | null | undefined>(null);
  const { posts: boardList } = usePosts(communityKeyState);
  const [polygonValue, setPolygonState] = useRecoilState(polygonState);
  const filterOption = useRecoilValue(filterOptionState);
  const currentValue = useRecoilValue(currentState);
  const setMarkerId = useSetRecoilState(markerIdState);
  const setBoardListState = useSetRecoilState(boardListState);
  const setCommunityKey = useSetRecoilState(communityKeyState);

  //로컬스토리지 여기서 잠깐 저장좀
  // localStorage.setItem('location', '강남구');

  useEffect(() => {
    const getCenter = () => {
      const gu =
        (localStorage.getItem('location') as guchung) ?? polygonValue.gu;
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
  }, [filterOption, polygonValue.gu, setCommunityKey]);

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
                  text={`# ${hashtag?.split('#')[1]}`}
                  onClick={(e: google.maps.event) => {
                    onClickMarker(e, postId, latlng);
                  }}
                />
              </div>
            );
          })}
        </>
      </GoogleMap>
    </section>
  );
};

export default CommunityMap;
