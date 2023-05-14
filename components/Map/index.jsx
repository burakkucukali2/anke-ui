import React, {useMemo, useRef, useCallback} from "react";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import styles from "./index.module.css";

const containerStyle = {
    width: '500px',
    height: '350px',
    borderRadius: '10px',
};

const DEFAULT_CENTER = { lat: 40.9918996, lng: 28.8342029 };

const GOOGLE_MAPS_API_KEY = "AIzaSyD47xPQo1fX4bD5W1MQybxplxj4rhhiq74";
function Map() {
    const mapRef = useRef(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY
    });

    const center = useMemo(() => (DEFAULT_CENTER), []);

    const options = useMemo(()=> ({
        disableDefaultUI: true,
        clickableIcons: false,
    })  ,[])

    const onLoad = useCallback((map) => (mapRef.current = map), []);

    const handleClickOpenNewTabCenter = () => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`, "_blank");
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={10}
            center={center}
            options={options}
            onLoad={onLoad}
        >
            <Marker position={center} onClick={handleClickOpenNewTabCenter} />
        </GoogleMap>
    ) : <></>;
}

export default React.memo(Map);
