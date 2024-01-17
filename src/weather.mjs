import { eraseErrorMessage, displayErrorMessage } from './render.mjs';

/**
 * Fetches weather data for a specified city using the WeatherAPI's API
 * (available at https://api.weatherapi.com).
 *
 * @param {String} cityName - The name of the city.
 * @returns {Promise} A promise resolving to the weather data.
 */
async function fetchWeatherData(cityName) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=998c75f5d06b4a84ae245051241201&q=${cityName}`
  );

  console.log(response);
  if (!response.ok) throw new Error('Location Not Found');

  return response.json();
}

/**
 * Filters the provided weather information and returns a new object
 * containing only relevant properties.
 *
 * @param {Object} weatherInfo - The raw weather data to be filtered.
 * @returns {Object} A new object with filtered weather details.
 */
function filterWeatherDetails(weatherInfo) {
  if (!weatherInfo || !weatherInfo.current || !weatherInfo.location) {
    throw new Error('Invalid weather data structure');
  }
  return {
    // Extract and structure relevant information about the current weather
    current: {
      isDay: weatherInfo.current.is_day,
      code: weatherInfo.current.condition.code,
      codeToIcon: {
        1000: '113',
        1003: '116',
        1006: '119',
        1009: '122',
        1030: '143',
        1063: '176',
        1066: '179',
        1069: '182',
        1072: '185',
        1087: '200',
        1114: '227',
        1117: '230',
        1135: '248',
        1147: '260',
        1150: '263',
        1153: '266',
        1168: '281',
        1171: '284',
        1180: '293',
        1183: '296',
        1186: '299',
        1189: '302',
        1192: '305',
        1195: '308',
        1198: '311',
        1201: '314',
        1204: '317',
        1207: '320',
        1210: '323',
        1213: '326',
        1216: '329',
        1219: '332',
        1222: '335',
        1225: '338',
        1237: '350',
        1240: '353',
        1243: '356',
        1246: '359',
        1249: '362',
        1252: '365',
        1255: '368',
        1258: '371',
        1261: '374',
        1264: '377',
        1273: '386',
        1276: '389',
        1279: '392',
        1282: '395',
      },
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
        km: weatherInfo.current.vis_km,
        mi: weatherInfo.current.vis_miles,
      },
      wind: {
        kph: weatherInfo.current.wind_kph,
        mph: weatherInfo.current.wind_mph,
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
  try {
    const weatherData = await fetchWeatherData(cityName).then(
      filterWeatherDetails
    );

    return weatherData;
  } catch (error) {
    console.error(error);
    displayErrorMessage(error);
    setTimeout(eraseErrorMessage, 5000);
    return null;
  }
}
