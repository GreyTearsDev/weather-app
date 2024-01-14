/**
 * Gets (from https://api.weatherapi.com)
 * the weather data for a city
 *
 * @param {string} cityName Name of the city
 * @returns A promise for the data about the weather
 */
export default async function getCurrentWeather(cityName) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=998c75f5d06b4a84ae245051241201&q=${cityName}`
    );
    return response.json();
  } catch (e) {
    console.error(e);
  }
}

function filterWeatherDetails(weatherInfo) {
  return {
    current: {
      temperature: {
        real: {
          degreesCelsius: weatherInfo.current.temp_c,
          degreesFahrenheit: weatherInfo.current.temp_f,
        },
        feelsLike: {
          degreesCelsius: weatherInfo.current.condition.feelsLike_c,
          degreesFahrenheit: weatherInfo.current.condition.feelsLike_f,
        },
      },
      visibility: {
        kilometers: weatherInfo.current.condition.vis_km,
        miles: weatherInfo.current.condition.vis_miles,
      },
      wind: {
        kilometersPerHour: weatherInfo.current.condition.wind_kph,
        milesPerHour: weatherInfo.current.condition.wind_mph,
      },
      condition: weatherInfo.current.condition.text,
      humidity: weatherInfo.current.condition.humidity,
      uv: weatherInfo.current.condition.uv,
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
