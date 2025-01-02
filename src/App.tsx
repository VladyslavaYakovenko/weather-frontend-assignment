import React from "react";
import HourlyForecast from "./components/HourlyForecast";
import Temperature from "./components/Temperature";
import { fetchWeatherData } from "./api/weather";
import useUserLocation from "./hooks/use-user-location";
import dayjs from "dayjs";
import Card from "./components/Card";
import { GeoName, WeatherData } from "./types";
import DailyForecast from "./components/DailyForecast";
import Search from "./components/Search";
import { Icon } from "@iconify/react/dist/iconify.js";
import Humidity from "./components/Humidity";
import FeelsLike from "./components/FeelsLike";
import { getVisibilityDescription } from "./helpers";
import UvIndex from "./components/UvIndex";
import WindCard from "./components/WindCard";

function App() {
  const [weatherData, setWeatherData] = React.useState<WeatherData>();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const { location, setLocation } = useUserLocation();

  const currentWeather = weatherData?.current;
  const wetherForecast = weatherData?.forecast;

  const hourlyForecast = wetherForecast?.forecastday
    .map((item) => item.hour)
    .flat();

  const minTempArr =
    wetherForecast?.forecastday.map((t) => t.day.mintemp_c) || [];
  const min = Math.min(...minTempArr);

  const maxTempArr =
    wetherForecast?.forecastday.map((t) => t.day.maxtemp_c) || [];
  const max = Math.max(...maxTempArr);

  const dailyForecast = wetherForecast?.forecastday.map((item) => (
    <DailyForecast key={item.date_epoch} data={item} min={min} max={max} />
  ));

  const hourlyForecastList = hourlyForecast
    ?.filter(
      (item) =>
        new Date(item.time).getHours() >= new Date().getHours() ||
        !dayjs(item.time).isToday()
    )
    .slice(0, 24);

  React.useEffect(() => {
    if (!location) return;

    fetchWeatherData({ lat: location.lat, lon: location.lng })
      .then((data) => {
        setWeatherData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [location]);

  function handleLocationChange(newLocation: GeoName) {
    setLocation(newLocation);
    setIsSearchOpen(false);
  }

  return (
    <div className=" flex h-screen bg-sky-700 text-slate-300 pb-6 overflow-hidden">
      <div className="px-6 xl:px-24 flex-1 overflow-auto flex flex-col hide-scrollbar">
        {!weatherData ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sky-100"></div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center py-2">
              <h3>MinVærApp</h3>
              <button
                data-testid="search-button"
                className="lg:hidden bg-sky-800 text-slate-300 p-3 rounded-full"
                onClick={() => setIsSearchOpen((prev) => !prev)}
              >
                <Icon icon="line-md:search" />
              </button>
            </div>

            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center">
                <p className="text-4xl" data-testid="location">
                  {location?.name}
                </p>

                <Temperature
                  className="text-6xl"
                  value={currentWeather?.temp_c || 0}
                />

                <p>{currentWeather?.condition.text}</p>
                <div className="flex gap-4 justify-center">
                  <div>
                    H:
                    <Temperature
                      value={wetherForecast?.forecastday[0].day.maxtemp_c || 0}
                    />
                  </div>
                  <div>
                    L:
                    <Temperature
                      value={wetherForecast?.forecastday[0].day.mintemp_c || 0}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 sm:grid-rows-[auto_1fr_1fr_1fr] gap-3 mt-3 flex-1">
              <Card
                className="col-span-2 sm:col-span-4"
                label="Hourly Forecast"
                icon={<Icon icon="ic:baseline-access-time" />}
              >
                <div className="mt-2 hide-scrollbar flex gap-2.5 items-center overflow-auto w-full snap-x">
                  {hourlyForecastList?.map((item) => (
                    <HourlyForecast data={item} key={item.time_epoch} />
                  ))}
                </div>
              </Card>
              <Card
                className="col-span-2 sm:col-span-2 sm:row-span-4 max-h-fit"
                label="Daily Forecast"
                icon={<Icon icon="line-md:calendar" />}
              >
                <div className="overflow-auto">{dailyForecast}</div>
              </Card>
              <Card label="Humidity" icon={<Icon icon="mdi-water-percent" />}>
                <Humidity
                  humidity={currentWeather?.humidity || 0}
                  dewpoint={currentWeather?.dewpoint_c || 0}
                />
              </Card>

              <Card
                label="Feels Like"
                icon={<Icon icon="ion:thermometer-outline" />}
              >
                <FeelsLike
                  feelsLikeTemp={currentWeather?.feelslike_c || 0}
                  actualTemp={currentWeather?.temp_c || 0}
                />
              </Card>
              <Card
                className="sm:col-start-3"
                label="Sunrise"
                icon={<Icon icon="ic:outline-wb-sunny" />}
              >
                <div className="flex flex-col h-full justify-center gap-6">
                  <p className=" text-2xl xl:text-4xl">
                    {weatherData?.forecast.forecastday[0].astro.sunrise}
                  </p>
                  <p className="text-lg">
                    Sunset: {weatherData?.forecast.forecastday[0].astro.sunset}
                  </p>
                </div>
              </Card>

              <Card
                className="sm:col-start-4"
                label="UV Index"
                icon={<Icon icon="ic:baseline-wb-sunny" />}
              >
                <UvIndex uvIndex={currentWeather?.uv || 0} />
              </Card>

              <Card
                className="sm:col-start-3"
                label="Visibility"
                icon={<Icon icon="ic:baseline-visibility" />}
              >
                <div className="flex flex-col h-full justify-between">
                  <p className="text-4xl">
                    {Math.round(currentWeather?.vis_km || 0)} km
                  </p>
                  {weatherData && (
                    <p className="text-lg">
                      {getVisibilityDescription(weatherData)}
                    </p>
                  )}
                </div>
              </Card>

              <Card label="Wind" icon={<Icon icon="bi-wind" />}>
                <div className="flex flex-col h-full justify-between">
                  <div className="flex justify-center pt-2">
                    <WindCard
                      speed={currentWeather?.wind_kph || 0}
                      degree={currentWeather?.wind_degree || 0}
                    />
                  </div>
                  <p className="text-sm pt-2">
                    Gust: {Math.round(currentWeather?.gust_kph || 0)} km/h
                  </p>
                </div>
              </Card>
            </div>
          </>
        )}
      </div>

      <Card
        className={`hidden absolute right-0 top-0 h-full lg:static lg:block w-full lg:w-[400px] bg-sky-800 lg:bg-blue-300/20 pr-0 pl-6 py-6 shrink-0 rounded-none ${
          isSearchOpen && "!block"
        }`}
      >
        <Search
          onLocationItemClick={handleLocationChange}
          open={isSearchOpen}
        />
        <button
          className="absolute top-3 right-3 lg:hidden bg-sky-800 text-slate-300 p-3 rounded-full"
          onClick={() => setIsSearchOpen((prev) => !prev)}
        >
          <Icon icon="line-md:close" />
        </button>
      </Card>
    </div>
  );
}

export default App;
