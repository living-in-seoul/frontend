"use client";
import React, { useRef } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 37.566,
  lng: 126.977,
};

const mapOptions = {
  disableDefaultUI: true,
  language: "ko",
};

const Map = () => {
  const first = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ""}
      preventGoogleFontsLoading={true}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}>
        {<MarkerF position={{ lat: 37.566, lng: 126.977 }} />}
        <></>
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
