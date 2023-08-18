'use client';
import {
  GoogleMap,
  LoadScriptNext,
  MarkerF,
  HeatmapLayerF,
  PolygonF,
  InfoBoxF,
  Marker,
} from '@react-google-maps/api';
import {
  filterState,
  placeIdState,
  placesState,
  rangeState,
  selectDongPlaceState,
  selectGuPlaceState,
} from '@/recoil/mapStates';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import useMapInstance from '@/hooks/useMapInstance';
import { useRouter } from 'next/navigation';
import { MapStyleVersionTwo } from '@/utils/styles';
import { googleMapsLibraries } from '@/utils/constants';

const containerStyle = {
  width: '100%',
  height: '100vh',
};
const Map = () => {
  const router = useRouter();
  const [placeId, setPlaceIdState] = useRecoilState(placeIdState);
  const filterValue = useRecoilValue(filterState);
  const rangeValue = useRecoilValue(rangeState);
  const [zoom, setZoom] = useState<number>(18);
  const { map, onLoad, onUnmount } = useMapInstance();
  const [center, setCenter] = useState<LatLng>({
    lat: 37.5665,
    lng: 126.978,
  });
  const [selectedDong, setSelectedDong] = useRecoilState(selectDongPlaceState);
  const { data: locationDetail } = useSWR<PlaceByPlaceIdResponse>(
    placeId ? `api/map/places/${placeId}` : null,
    null,
    {
      focusThrottleInterval: 5000,
    },
  );
  const setPlacesState = useSetRecoilState(placesState);
  const placeGu = useRecoilValue(selectGuPlaceState);
  // const seoulBound = new google.maps.LatLngBounds(
  //   new google.maps.LatLng(37.426, 126.764), // 남서쪽 좌표
  //   new google.maps.LatLng(37.701, 127.183), // 북동쪽 좌표
  // );

  const mapOptions: google.maps.MapOptions = {
    fullscreenControl: true,
    gestureHandling: 'greedy',
    disableDoubleClickZoom: true,
    disableDefaultUI: true,
    styles: MapStyleVersionTwo,
  };

  const { data: cityData } = useSWR<ResponseCityImageData[]>(
    `/api/board/${'중구'}`,
  );
  const fetcherURL = placeGu ? `api/map/seoul/dong?guName=${placeGu}` : null;
  const { data: dongs } = useSWR<Dong>(fetcherURL);
  // const { places } = useNearbySearch({
  //   map,
  //   center,
  //   radius: rangeValue,
  //   type: filterValue,
  // });

  // const { places } = useNearbySearch({
  //   map,
  //   center,
  //   radius: rangeValue,
  //   type: filterValue,
  // });

  useEffect(() => {
    if (map && locationDetail) {
      map.panTo(locationDetail.result.geometry.location);
      setCenter(locationDetail.result.geometry.location);
    }
  }, [locationDetail, map]);

  // useEffect(() => {
  //   if (map && locationDetail) {
  //     map.panTo(locationDetail.result.geometry.location);
  //     setCenter(locationDetail.result.geometry.location);
  //   }
  // }, [locationDetail, map]);

  // useEffect(() => {
  //   setPlacesState(places);
  // }, [places, setPlacesState]);
  //   setPlacesState(places);
  // }, [places, setPlacesState]);

  useEffect(() => {
    if (rangeValue > 200) {
      setZoom(18);
    }
    if (rangeValue > 400) {
      setZoom(17);
    }
    if (rangeValue > 500) {
      setZoom(16);
    }
    if (rangeValue > 700) {
      setZoom(15);
    }
  }, [rangeValue, filterValue]);

  const onMarkerClick = (
    _: google.maps.MapMouseEvent,
    placeId: string | undefined,
  ) => {
    placeId && setPlaceIdState(placeId);
    router.push(`/place/${placeId}`);
  };

  return (
    <section className="w-full h-full bg-slate-400">
      <LoadScriptNext
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''}
        libraries={googleMapsLibraries}
      >
        <GoogleMap
          onClick={(e) => e.stop()}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            ...mapOptions,
            // restriction: {
            //   latLngBounds: seoulBound,
            //   strictBounds: true,
            // },
          }}
        >
          {/* {typeof google !== 'undefined' && (
            <HeatmapLayerF
              data={[
                new google.maps.LatLng(37.5665, 126.978),
                new google.maps.LatLng(37.57, 126.981),
              ]}
              options={{
                maxIntensity: 3,
                gradient: ['rgba(255, 0, 0, 0)', 'rgba(255, 0, 0, 1)'],
                dissipating: true,
                opacity: 0.8,
                radius: 1,
              }}
            />
          )}

          {places?.map((place) => {
            if (!place.geometry?.location) {
              return;
            }
            return (
              <MarkerF
                key={place.place_id}
                position={place.geometry?.location}
                onClick={(e) => onMarkerClick(e, place.place_id)}
              />
            );
          })} */}
          {dongs &&
            dongs?.features.map((feature, index) => {
              if (index === 0) return;
              const isSelected = selectedDong === feature.properties.EMD_NM;
              const latLngCoordinates = feature.geometry.coordinates[0]
                .filter((coord) => !isNaN(coord[0]) && !isNaN(coord[1]))
                .map((coord) => new google.maps.LatLng(coord[1], coord[0]));

              if (latLngCoordinates.length === 0) return null;

              return (
                <PolygonF
                  key={feature.properties.EMD_NM}
                  path={latLngCoordinates}
                  onDblClick={() => {
                    setSelectedDong(feature.properties.EMD_NM);

                    const bounds = new google.maps.LatLngBounds();
                    latLngCoordinates.forEach((coord) => bounds.extend(coord));
                    const center = bounds.getCenter();

                    if (map) {
                      map.panTo(center);
                      map.setZoom(16);
                    }
                  }}
                  options={{
                    fillColor: isSelected ? 'blue' : '000000',
                    fillOpacity: 0,
                    strokeColor: isSelected ? 'blue' : 'gray',
                    strokeWeight: 2,
                    zIndex: isSelected ? 10 : 0,
                  }}
                />
              );
            })}
        </GoogleMap>
      </LoadScriptNext>
      <GoogleMap
        onClick={(e) => e.stop()}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          ...mapOptions,
          // restriction: {
          //   latLngBounds: seoulBound,
          //   strictBounds: true,
          // },
        }}
      >
        <HeatmapLayerF
          data={[
            new google.maps.LatLng(37.5665, 126.978),
            new google.maps.LatLng(37.57, 126.981),
          ]}
          options={{
            maxIntensity: 3,
            gradient: ['rgba(255, 0, 0, 0)', 'rgba(255, 0, 0, 1)'],
            dissipating: true,
            opacity: 0.8,
            radius: 1,
          }}
        />
        {cityData?.map((data) => {
          if (!map || !data.geometry?.location) {
            return;
          }
          return (
            <MarkerF
              // map={map}
              key={data.place_id}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: 'green',
                fillOpacity: 1,
                scale: 5,
                strokeColor: 'white',
                strokeWeight: 1,
              }}
              position={data.geometry.location}
            >
              {
                <InfoBoxF
                  // onCloseClick={props.onToggleOpen}
                  options={{ closeBoxURL: ``, enableEventPropagation: true }}
                >
                  <div className="bg-[#2DDAB0] text-white p-2 rounded-lg shadow-lg px-2 w-full max-w-[120px] ">
                    <div className="text-[0.7rem]">{data.name}</div>
                    <span className="text-[0.3rem]">
                      {data.AREA_CONGEST_LVL}
                    </span>
                  </div>
                </InfoBoxF>
              }
            </MarkerF>
          );
        })}
        {/* {places?.map((place) => {
          if (!place.geometry?.location) {
            return;
          }
          return (
            <MarkerF
              key={place.place_id}
              position={place.geometry?.location}
              icon={{
                url: 'http://localhost:3000/marker/base.png',
              }}
              onClick={(e) => onMarkerClick(e, place.place_id)}
            ></MarkerF>
          );
        })} */}
      </GoogleMap>
    </section>
  );
};

const MarkerIcons = {
  restaurants: 'http://localhost:3000/marker/restaurants.png',
};

export default Map;
