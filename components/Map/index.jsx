import React, { useMemo, useRef, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import styles from "./index.module.css";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
};

const DEFAULT_CENTER = { lat: 40.99205, lng: 28.8342 };
const MAP_URL =
  "https://www.google.com/maps/place/Anke+Yap%C4%B1+ve+M%C3%BChendislik+San.+Tic.+Ltd.+%C5%9Eti./@40.9918676,28.8293359,17z/data=!3m1!4b1!4m6!3m5!1s0x14caa17ead84e911:0x67856cc7ccd6cbc3!8m2!3d40.9918677!4d28.8342068!16s%2Fg%2F11g_t267m?entry=ttu";
const GOOGLE_MAPS_API_KEY = "AIzaSyD47xPQo1fX4bD5W1MQybxplxj4rhhiq74";

function Map() {
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const center = useMemo(() => DEFAULT_CENTER, []);

  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const handleClickOpenNewTabCenter = () => {
    window.open(MAP_URL, "_blank");
  };

  return isLoaded ? (
    <div className={styles["map-container"]}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={10}
        center={center}
        options={options}
        onLoad={onLoad}
      >
        <Marker position={center} onClick={handleClickOpenNewTabCenter} />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(Map);
