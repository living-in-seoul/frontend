'use client';
import { selectGuPlaceState } from '@/recoil/mapStates';
import { outerCoords, seoulCenterCoords } from '@/utils/constants/constants';
import {
  MapGuDardkStyle,
  MapGuDefaultStyle,
  MapGuSelectStyle,
} from '@/utils/styles';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const ZOOM = 10;
const STATE_GEOSEOUL = `${process.env.NEXT_PUBLIC_OUR_URL}/api/map/seoul`;

const useMapInstance = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const setPlacesGu = useSetRecoilState(selectGuPlaceState);

  // /**맵 구 클릭시 */
  // const setMapFeatureStyle = (
  //   feature: google.maps.Data.Feature,
  //   mapInstance: google.maps.Map,
  // ) => {
  //   mapInstance.data.revertStyle();
  //   mapInstance.data.setStyle(MapGuDardkStyle);
  //   mapInstance.data.overrideStyle(feature, MapGuSelectStyle);
  // };
  // /**구 클릭시 이동*/
  // const centerMapToDistrict = (
  //   districtName: guchung,
  //   mapInstance: google.maps.Map,
  // ) => {
  //   const centerCoord = seoulCenterCoords[districtName];
  //   if (centerCoord) {
  //     mapInstance.setCenter(centerCoord);
  //     mapInstance.setZoom(13);
  //   }
  // };
  // /** 맵 클릭함수 */
  // const handleMapFeatureClick = useCallback(
  //   (event: google.maps.Data.MouseEvent, mapInstance: google.maps.Map) => {
  //     const districtName: guchung = event.feature.getProperty('SGG_NM');
  //     setPlacesGu(districtName);
  //     setMapFeatureStyle(
  //       event.feature as google.maps.Data.Feature,
  //       mapInstance,
  //     );
  //     centerMapToDistrict(districtName, mapInstance);
  //   },
  //   [setPlacesGu],
  // );

  // const loadGeoJsonDataToMap = useCallback(
  //   (mapInstance: google.maps.Map, geoJsonUrl: string) => {
  //     mapInstance.data.loadGeoJson(geoJsonUrl); // 맵 데이터 불러오기
  //     mapInstance.data.setStyle(MapGuDefaultStyle); //맵 스타일 설정
  //     mapInstance.data.addListener(
  //       // 맵 클릭시 함수실행
  //       'dblclick',
  //       (event: google.maps.Data.MouseEvent) => {
  //         handleMapFeatureClick(event, mapInstance);
  //       },
  //     );
  //   },
  //   [handleMapFeatureClick],
  // );

  // /** 서울지역 외 어둡게 */
  // const loadPolygonFromGeoJSON = async (
  //   mapInstance: google.maps.Map,
  //   geoJsonUrl: string,
  // ) => {
  //   const response = await fetch(geoJsonUrl);
  //   const geoJsonData = await response.json();

  //   const seoulCoords = geoJsonData.features.map(
  //     (feature: { geometry: { coordinates: any[][] } }) =>
  //       feature.geometry.coordinates[0].map((coord: any[]) => ({
  //         lat: coord[1],
  //         lng: coord[0],
  //       })),
  //   );

  //   const combinedPaths = [outerCoords, ...seoulCoords]; // hole 전체영영에서 서울지역 제외

  //   const polygon = new google.maps.Polygon({
  //     paths: combinedPaths,
  //     strokeOpacity: 0.8,
  //     strokeWeight: 0.5,
  //     fillColor: '#000000',
  //     fillOpacity: 0.5,
  //   });

  //   polygon.setMap(mapInstance);
  // };

  const onLoad = useCallback((map: google.maps.Map) => {
    map.setZoom(ZOOM);
    map.setCenter(new google.maps.LatLng(37.5665, 126.977));
    setMap(map);
    // loadGeoJsonDataToMap(map, STATE_GEOSEOUL);
    // loadPolygonFromGeoJSON(map, STATE_GEOSEOUL);
  }, []);

  const onUnmount = useCallback((map: google.maps.Map) => {
    map;
    setMap(null);
  }, []);

  return { onLoad, onUnmount, map };
};

export default useMapInstance;
