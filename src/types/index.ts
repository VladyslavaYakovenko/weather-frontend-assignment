export interface Condition {
  code: number;
  icon: string;
  text: string;
}

export interface HourForecastItem {
  time: string;
  temp_c: number;
  time_epoch: number;
  condition: Condition;
}

export interface DayWeatherData {
  maxtemp_c: number;
  mintemp_c: number;
  avgtemp_c: number;
  condition: Condition;
}

export interface DayForecast {
  astro: {
    sunrise: string;
    sunset: string;
  };
  date_epoch: number;
  date: string;
  day: DayWeatherData;
  hour: HourForecastItem[];
}

export interface WeatherData {
  current: {
    uv: number;
    vis_km: number;
    dewpoint_c: number;
    humidity: number;
    temp_c: number;
    feelslike_c: number;
    condition: Condition;
    gust_kph: number;
    wind_degree: number;
    wind_kph: number;
  };
  forecast: {
    forecastday: DayForecast[];
  };
  location: Location;
}

export interface Location {
  country: string;
  lat: number;
  localtime: string;
  localtime_epoch: number;
  lon: number;
  name: string;
  region: string;
  tz_id: string;
}

export interface GeoName {
  adminName1: string;
  name: string;
  countryName: string;
  fclName: string;
  lng: number;
  lat: number;
  geonameId: number;
}

export interface LastSearhedGeoName extends GeoName {
  createdAt: number;
}

export interface GeoNameResponse {
  geonames: GeoName[];
}
