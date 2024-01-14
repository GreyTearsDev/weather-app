/**
 * Fetches the weather data of a given city
 * whose name is passed as the argument
 * using "WeatherAPI"'s API
 * (at https://api.weatherapi.com)
 *
 *
 * @param {string} cityName Name of the city
 * @returns A promise for the data about the weather
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

export async function loadInitialWeatherData() {
  const cityName = 'lobito';
  const response = await getCurrentWeather(cityName);
  const weatherInfo = filterWeatherDetails(response);
  displayWeather(weatherInfo);
}

/**
 * Filters the data passed as argument and returns
 * an object containing only relevant properties
 *
 * @param {*} weatherInfo Data to be filtered from
 * @returns A new object
 */
function filterWeatherDetails(weatherInfo) {
  return {
    current: {
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
      condition: weatherInfo.current.text,
      humidity: weatherInfo.current.humidity,
      uv: weatherInfo.current.uv,
    },
    location: {
      city: weatherInfo.location.name,
      region: weatherInfo.location.region,
      country: weatherInfo.location.country,
      localTime: weatherInfo.location.localtime,
      timeZone: weatherInfo.location.tz_id,
    },
  };
}

function displayWeather(weatherInfo) {
  console.log(weatherInfo);
}

export default async function getWeather(cityName) {
  const response = await fetchWeatherData(cityName);
  const cleanData = filterWeatherDetails(response);
  return cleanData;
}
