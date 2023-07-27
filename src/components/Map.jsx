import React, { useEffect, useState } from "react";

const Map = () => {
  const [map, setMap] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (currentPosition) {
      const mapOptions = {
        center: currentPosition,
        zoom: 15,
      };
      const newMap = new window.google.maps.Map(
        document.getElementById("map"),
        mapOptions
      );

      const marker = new window.google.maps.Marker({
        position: currentPosition,
        map: newMap,
      });

      setMap(newMap);
    }
  }, [currentPosition]);

  return <div id="map" style={{ height: "100%" }}></div>;
};

export default Map;
