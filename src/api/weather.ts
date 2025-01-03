import { Coordinates } from "../hooks/use-user-location";
import { GeoNameResponse, WeatherData } from "../types";

export function fetchWeatherData({
  lat,
  lon,
}: Coordinates): Promise<WeatherData> {
  return fetch(`/api/proxy?lat=${lat}&lon=${lon}&endpoint=weather`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    }
  );
}

export function fetchCityLocation(
  query: string,
  signal: AbortSignal
): Promise<GeoNameResponse> {
  return fetch(`/api/proxy?query=${encodeURIComponent(query)}&endpoint=city`, {
    signal,
  }).then((response) => {
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
  return fetch(`/api/proxy?lat=${lat}&lon=${lon}&endpoint=coords`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    }
  );
}
