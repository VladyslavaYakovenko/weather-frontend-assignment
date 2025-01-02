import fetch from "node-fetch";

exports.handler = async (event) => {
  const { lat, lon, query, endpoint } = event.queryStringParameters;

  let apiUrl;

  // Build the API URL based on the endpoint parameter
  if (endpoint === "weather") {
    apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=55e5d3bb34ea4b829b3114746242011&q=${lat},${lon}&days=10&aqi=no&alerts=no`;
  } else if (endpoint === "city") {
    apiUrl = `http://api.geonames.org/searchJSON?q=${query}&orderby=relevance&username=vladyslavayakovenko`;
  } else if (endpoint === "coords") {
    apiUrl = `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lon}&fclass=P&fcode=PPLA&fcode=PPL&fcode=PPLC&username=vladyslavayakovenko`;
  }

  if (!apiUrl) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid parameters" }),
    };
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data" }),
    };
  }
};
