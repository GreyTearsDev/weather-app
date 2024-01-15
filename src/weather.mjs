/**
 * Fetches weather data for a specified city using the WeatherAPI's API
 * (available at https://api.weatherapi.com).
 *
 * @param {String} cityName - The name of the city.
 * @returns {Promise} A promise resolving to the weather data.
 */
async function fetchWeatherData(cityName) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=998c75f5d06b4a84ae245051241201&q=${cityName}`
    );
    return response.json();
  } catch (e) {
    console.error(e);
  }
}

/**
 * Filters the provided weather information and returns a new object
 * containing only relevant properties.
 *
 * @param {Object} weatherInfo - The raw weather data to be filtered.
 * @returns {Object} A new object with filtered weather details.
 */
function filterWeatherDetails(weatherInfo) {
  console.log(weatherInfo);
  return {
    // Extract and structure relevant information about the current weather
    current: {
      isDay: weatherInfo.current.is_day,
      code: weatherInfo.current.condition.code,
      temperature: {
        real: {
          degreesCelsius: weatherInfo.current.temp_c,
          degreesFahrenheit: weatherInfo.current.temp_f,
        },
        feelsLike: {
          degreesCelsius: weatherInfo.current.feelslike_c,
          degreesFahrenheit: weatherInfo.current.feelslike_f,
        },
      },
      visibility: {
        kilometers: weatherInfo.current.vis_km,
        miles: weatherInfo.current.vis_miles,
      },
      wind: {
        kilometersPerHour: weatherInfo.current.wind_kph,
        milesPerHour: weatherInfo.current.wind_mph,
      },
      condition: weatherInfo.current.condition.text,
      humidity: weatherInfo.current.humidity,
      uv: weatherInfo.current.uv,
    },
    // Extract and structure information about the location
    location: {
      city: weatherInfo.location.name,
      region: weatherInfo.location.region,
      country: weatherInfo.location.country,
      localTime: weatherInfo.location.localtime,
      timeZone: weatherInfo.location.tz_id,
    },
  };
}

/**
 * Retrieves weather information for a specified city.
 *
 * @param {String} cityName - The name of the city.
 * @returns {Object} An object containing weather information.
 */
export default async function getWeather(cityName) {
  const response = await fetchWeatherData(cityName);
  return filterWeatherDetails(response);
}
