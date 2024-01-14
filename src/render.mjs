import { getCityNameFromUserInput } from './util.mjs';
import getWeather from './weather.mjs';

export async function updateInfoOnScreen() {
  const cityName = getCityNameFromUserInput();
  const weather = await getWeather(cityName);
  displayMainInfo(weather);
}

function displayMainInfo(weather) {
  const currentTemperature = document.getElementById('current-temperature');
  const feelsLikeTemperature = document.getElementById(
    'feels-like-temperature'
  );
  const realCelsius = weather.current.temperature.real.degreesCelsius;
  const realFahrenheit = weather.current.temperature.real.degreesFahrenheit;
  const FeelsLikeCelsius = weather.current.temperature.feelsLike.degreesCelsius;
  const FeelsLikeFahrenheit =
    weather.current.temperature.feelsLike.degreesFahrenheit;

  currentTemperature.innerText = `${realCelsius}°C`;
  feelsLikeTemperature.innerText = `Feels like ${FeelsLikeCelsius}°C`;
}
