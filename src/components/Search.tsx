import { Icon } from "@iconify/react/dist/iconify.js";
import CityCard from "./CItyCard";
import { fetchCityLocation } from "../api/weather";
import { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { GeoName, LastSearhedGeoName } from "../types";

interface Props {
  onLocationItemClick: (location: GeoName) => void;
  open: boolean;
}

function Search(props: Props) {
  const lastSeenMaxLenght = 6;
  const maxItemsToShow = 7;

  const [selectedGeoname, setSelectedGeoname] = useState<GeoName>();
  const [cities, setCities] = useState<GeoName[]>(loadLastSearched());
  const [isShowAll, setIsShowAll] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  const [lastSearched, setLastSearched] = useState<LastSearhedGeoName[]>(
    loadLastSearched()
  );

  const filteredCities = searchFilter
    ? isShowAll
      ? cities
      : cities.slice(0, maxItemsToShow)
    : lastSearched;

  useEffect(() => {
    localStorage.setItem("lastSearched", JSON.stringify(lastSearched));
  }, [lastSearched]);

  useEffect(() => {
    setSearchFilter("");
  }, [props.open]);

  function loadLastSearched() {
    const lastSearched = localStorage.getItem("lastSearched");

    return JSON.parse(lastSearched || "[]");
  }

  function addLastSearch(city: GeoName) {
    setLastSearched((prev) => {
      const updatedLastSearched = [...prev];

      const existingIndex = updatedLastSearched.findIndex(
        (item) => item.geonameId === city.geonameId
      );

      if (existingIndex !== -1) {
        updatedLastSearched.splice(existingIndex, 1);
      }

      const newEntry = { ...city, createdAt: new Date().getTime() };

      if (updatedLastSearched.length >= lastSeenMaxLenght) {
        const oldestIndex = updatedLastSearched.reduce(
          (minIdx, current, idx, arr) =>
            current.createdAt < arr[minIdx].createdAt ? idx : minIdx,
          0
        );
        updatedLastSearched.splice(oldestIndex, 1);
      }

      return [newEntry, ...updatedLastSearched];
    });
  }

  function getCitiesForecast(city: string) {
    fetchCityLocation(city)
      .then((data) => {
        setCities(
          data.geonames.filter((i) =>
            i.name.toLowerCase().startsWith(city.toLowerCase())
          )
        );
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  const debouncedGetCitiesForecast = debounce(getCitiesForecast, 300);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="mr-6 mb-3 flex gap-3  items-center border-b border-blue-100">
        <Icon icon="line-md:search" />
        <input
          data-testid="search-input"
          value={searchFilter}
          className="flex-1 focus:outline-none placeholder:text-slate-300 text-lg bg-transparent text-slate-300 "
          type="text"
          placeholder="Search for a city..."
          onChange={(e) => {
            setIsShowAll(false);
            setSearchFilter(e.target.value);
            debouncedGetCitiesForecast(e.target.value);
          }}
        />
      </div>
      <div className="pr-6 flex flex-1 gap-3 flex-col overflow-auto">
        {filteredCities.map((city) => (
          <CityCard
            onClick={(city) => {
              setSelectedGeoname(city);
              addLastSearch(city);
              setTimeout(() => {
                props.onLocationItemClick(city);
              });
            }}
            key={city.geonameId}
            data={city}
            isSelected={selectedGeoname?.geonameId === city.geonameId}
          />
        ))}
        {!!filteredCities.length &&
          searchFilter &&
          cities.length > maxItemsToShow && (
            <button
              className="hover:bg-sky-300/10 self-center px-5 py-1 rounded-md"
              onClick={() => setIsShowAll((prev) => !prev)}
            >
              {isShowAll ? "Show less" : "Show all"}
            </button>
          )}
      </div>
    </div>
  );
}

export default Search;
