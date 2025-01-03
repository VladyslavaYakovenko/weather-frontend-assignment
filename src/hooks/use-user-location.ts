import React from "react";
import { fetchCityLocationByCoords } from "../api/weather";
import { GeoName } from "../types";
import { toast } from "react-toastify";

export interface Coordinates {
  lat: number;
  lon: number;
}

const useUserLocation = () => {
  const [location, setLocation] = React.useState<GeoName>();

  React.useEffect(() => {
    console.log("Getting user location");

    getUserLocation();
  }, []);

  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, (err) => {
        toast.error(err.message);
        toast.error("Please enable location services in your browser.");
      });
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

  return { location, setLocation };
};

export default useUserLocation;
