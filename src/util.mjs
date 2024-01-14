import getCurrentWeather from './city-data.mjs';

export function getCityNameFromUserInput() {
  return document.querySelector('.form__input').value;
}

export async function loadInitialWeatherData() {
  const cityName = 'lobito';
  const response = await getCurrentWeather(cityName);
  const weatherInfo = filterWeatherDetails(response);
  console.log(response.current);
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
