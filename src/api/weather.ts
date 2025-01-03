import { Coordinates } from "../hooks/use-user-location";
import { GeoNameResponse, WeatherData } from "../types";

export function fetchWeatherData({
  lat,
  lon,
}: Coordinates): Promise<WeatherData> {
  const query = `${lat},${lon}`;

  return fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=5f28edb39ec341cd94b202908250201&q=${query}&days=10&aqi=no&alerts=no`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
}

export function fetchCityLocation(
  query: string,
  signal: AbortSignal
): Promise<GeoNameResponse> {
  return fetch(
    `http://api.geonames.org/searchJSON?q=${query}&orderby=relevance&username=vladyslavayakovenko`,
    { signal }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
}
export function fetchCityLocationByCoords({
  lat,
  lon,
}: Coordinates): Promise<GeoNameResponse> {
  return fetch(
    `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lon}&fclass=P&fcode=PPLA&fcode=PPL&fcode=PPLC&username=vladyslavayakovenko`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
}
