import { WeatherData } from "./types";

export function getVisibilityDescription(weatherData: WeatherData) {
  const visibility = weatherData.current.vis_km;
  const condition = weatherData.current.condition;
  const weatherCode = condition.code;

  const visibilityDescriptions = {
    excellent: "Visibility is excellent.", // more than 10 km
    good: "Good visibility.", // between 5 and 10 km
    moderate: "Moderate visibility.", // between 1 and 5 km.
    poor: "Poor visibility.", // between 300 m and 1 km
    veryPoor: "Very poor visibility.", // less than 300 m
  };

  const weatherImpactDescriptions = {
    fog: "Heavy fog reduces visibility.",
    rain: "Rain decreases visibility.",
    snow: "Snowfall significantly limits visibility.",
    smoke: "Smoke or haze obstructs visibility.",
    dust: "Dust or a sandstorm makes visibility difficult.",
    default: "Weather conditions may affect visibility.",
  };

  let visibilityDescription = "";
  if (visibility > 10) {
    visibilityDescription = visibilityDescriptions.excellent;
  } else if (visibility > 5) {
    visibilityDescription = visibilityDescriptions.good;
  } else if (visibility > 1) {
    visibilityDescription = visibilityDescriptions.moderate;
  } else if (visibility > 0.3) {
    visibilityDescription = visibilityDescriptions.poor;
  } else {
    visibilityDescription = visibilityDescriptions.veryPoor;
  }

  const weatherConditionsMap: Record<
    number,
    keyof typeof weatherImpactDescriptions
  > = {
    1135: "fog",
    1147: "fog",
    1180: "rain",
    1183: "rain",
    1186: "rain",
    1210: "snow",
    1213: "snow",
    1225: "snow",
    1237: "snow",
    1273: "rain",
    1279: "snow",
    1282: "snow",
    1030: "smoke",
    1246: "rain",
    1007: "dust",
  };

  const impactKey = weatherConditionsMap[weatherCode] || "default";
  const impactDescription = weatherImpactDescriptions[impactKey];

  return `${visibilityDescription} ${impactDescription}`;
}
