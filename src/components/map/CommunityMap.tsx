'use client';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useMapInstance from '@/hooks/useMapInstance';
import { MapStyleVersionTwo } from '@/utils/styles';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import {
  boardListState,
  centerState,
  currentState,
  filterOptionState,
  gudongState,
  markerIdState,
} from '@/recoil/mapStates';
import { communityKeyState } from '@/recoil/communityStates';
import usePosts from '@/hooks/usePosts';
import CustomOverlayMarker from './marker/CustomOverlayMarker';
import { CommContainerStyle, mapOptions } from '@/utils/constants/constants';

const sample = [
  { gu: '강남구', dong: '신사동' },
  { gu: '강남구', dong: '역삼동' },
];

const CommunityMap = () => {
  const { map, onLoad, onUnmount } = useMapInstance();
  // const [zoom, setZoom] = useState(16);
  const [markerId, setMarkerId] = useRecoilState(markerIdState);
  const [center, setCenter] = useRecoilState(centerState);
  const filterOption = useRecoilValue(filterOptionState);
  const gudong = useRecoilValue(gudongState);
  const currentValue = useRecoilValue(currentState);
  const setBoardListState = useSetRecoilState(boardListState);
  const setCommunityKey = useSetRecoilState(communityKeyState);
  const { posts: boardList } = usePosts(communityKeyState);

  useEffect(() => {
    setCommunityKey(
      `/api/map/category?category=${filterOption}&gu=${sample[0].gu}&dong=${sample[0].dong}`,
    );
    console.log(filterOption);
  }, [filterOption, setCommunityKey]);

  useEffect(() => {
    if (boardList) setBoardListState(boardList);
    if (currentValue) setCenter(currentValue);
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
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        <>
          {/* 현위치 */}
          {/* <MarkerF position={currentValue} /> */}
          {/* boardlist */}
          {boardList &&
            boardList.result.map((post) => {
              const { postId, hashtag } = post.post;
              const latlng: LatLng = {
                lat: Number(post.location.lat),
                lng: Number(post.location.lng),
              };
              return (
                <CustomOverlayMarker
                  key={postId}
                  position={latlng}
                  text={`# ${hashtag.split('#')[1]}`}
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
