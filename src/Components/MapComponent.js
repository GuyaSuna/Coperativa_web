"use client";

import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const center = { lat: -34.397, lng: 150.644 }; 

const MapComponent = ({ setLatitud, setLongitud }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(center);

  const handleMapClick = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setMarker({ lat, lng });
    setLatitud(lat);
    setLongitud(lng);
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={{ height: "400px", width: "100%" }}
        center={center}
        zoom={10}
        onLoad={map => setMap(map)}
        onClick={handleMapClick}
      >
        <Marker position={marker} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
