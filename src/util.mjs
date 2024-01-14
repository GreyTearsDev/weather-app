import getCurrentWeather from './city-data.mjs';

export function getCityNameFromUserInput() {
  return document.querySelector('.form__input').value;
}

export async function loadInitialWeatherData() {
  const cityName = 'lobito';
  const weatherInfo = filterWeatherDetails(await getCurrentWeather(cityName));
  displayWeather(weatherInfo);
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

function displayWeather(weatherInfo) {
  console.log(weatherInfo.location);
}
