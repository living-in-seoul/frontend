//현위치로 center 갈 때 header 안 바뀌는거 괜찮나?

'use client';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useMapInstance from '@/hooks/useMapInstance';
import { GoogleMap } from '@react-google-maps/api';
import {
  boardListState,
  currentState,
  filterOptionState,
  markerIdState,
} from '@/recoil/mapStates';
import { communityKeyState } from '@/recoil/communityStates';
import usePosts from '@/hooks/usePosts';
import CustomOverlayMarker from './marker/CustomOverlayMarker';
import {
  CommContainerStyle,
  mapOptions,
  seoulCenterCoords,
} from '@/utils/constants/constants';

const CommunityMap = () => {
  const { map, onLoad, onUnmount } = useMapInstance();
  const [center, setCenter] = useState<LatLng | null | undefined>(null);
  const { posts: boardList } = usePosts(communityKeyState);
  const filterOption = useRecoilValue(filterOptionState);
  const currentValue = useRecoilValue(currentState);
  const setMarkerId = useSetRecoilState(markerIdState);
  const setBoardListState = useSetRecoilState(boardListState);
  const setCommunityKey = useSetRecoilState(communityKeyState);

  //로컬스토리지 여기서 잠깐 저장좀
  localStorage.setItem('location', '강남구');

  useEffect(() => {
    const getCenter = () => {
      const gu = localStorage.getItem('location') as guchung;
      if (gu && seoulCenterCoords.hasOwnProperty(gu)) {
        setCenter(seoulCenterCoords[gu]);
      } else {
        setCenter(seoulCenterCoords.전체);
      }
    };
    getCenter();
  }, []);

  useEffect(() => {
    const gu = localStorage.getItem('location') as guchung;
    setCommunityKey(`/api/map/category?category=${filterOption}&gu=${gu}`);
  }, [filterOption, setCommunityKey]);

  useEffect(() => {
    if (boardList) setBoardListState(boardList);
    if (currentValue.lat !== 0) setCenter(currentValue);
  }, [boardList, currentValue, filterOption, setBoardListState, setCenter]);

  useEffect(() => {
    if (map && center) {
      map.panTo(center);
    }
  }, [map, center]);

  const onClickMarker = (
    _: google.maps.event,
    postId: number,
    latlng: LatLng,
  ) => {
    setMarkerId(postId);
    setCenter(latlng);
  };

  return (
    <section className="w-full h-full relative z-100">
      <GoogleMap
        mapContainerStyle={CommContainerStyle}
        center={center ?? undefined}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        <>
          {/* 현위치 */}
          {/* <MarkerF position={currentValue} /> */}
          {/* boardlist */}
          {boardList?.result.map((post: ResponsePost) => {
            const { postId, hashtag } = post.post;
            const latlng = {
              lat: post.location.lat,
              lng: post.location.lng,
            };
            return (
              <CustomOverlayMarker
                key={postId}
                position={latlng}
                text={`# ${hashtag?.split('#')[1]}`}
                onClick={(e: google.maps.event) => {
                  onClickMarker(e, postId, latlng);
                }}
              />
            );
          })}
        </>
      </GoogleMap>
    </section>
  );
};

export default CommunityMap;
