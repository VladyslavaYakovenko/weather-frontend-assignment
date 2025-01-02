import React from "react";
import { fetchCityLocationByCoords } from "../api/weather";
import { GeoName } from "../types";

export interface Coordinates {
  lat: number;
  lon: number;
}

const useUserLocation = () => {
  const [location, setLocation] = React.useState<GeoName>();

  React.useEffect(() => {
    getUserLocation();
  }, []);

  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  const success: PositionCallback = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetchCityLocationByCoords({ lat, lon })
      .then((data) => {
        setLocation(data.geonames[0]);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
    console.log(`Latitude: ${lat}, Longitude: ${lon}`);
    console.log(position);
  };

  function error() {
    console.log("Unable to retrieve your location");
  }

  return { location, setLocation };
};

export default useUserLocation;
