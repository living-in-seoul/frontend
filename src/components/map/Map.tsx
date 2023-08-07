"use client";
import React, { useCallback, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 37.566,
  lng: 126.977,
};

const Map = () => {
  const first = useRef<HTMLDivElement | null>(null);

  const onLoad = React.useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
  }, []);

  //   const onUnmount = useCallback((map: google.maps.Map) => {}, []);

  const mapOptions = {
    disableDefaultUI: true,
    language: "ko",
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ""}
      preventGoogleFontsLoading={true}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        onLoad={onLoad}
        options={mapOptions}>
        {<Marker position={{ lat: 37.566, lng: 126.977 }} />}
        <></>
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
