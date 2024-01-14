import { getCityNameFromUserInput } from './util.mjs';
import getWeather from './weather.mjs';

export async function updateInfoOnScreen() {
  const cityName = getCityNameFromUserInput();
  const weather = await getWeather(cityName);
  displayMainInfo(weather);
}

function displayMainInfo(weather) {
  const current = document.getElementById('current-temperature');
  const feelsLike = document.getElementById('feels-like-temperature');
  const unit = getDegreeUnit();
  const realTemperature = weather.current.temperature.real[`degrees${unit}`];
  const feelsLikeTemperature =
    weather.current.temperature.feelsLike[`degrees${unit}`];

  if (unit === 'Celsius') {
    current.innerText = `${realTemperature}°C`;
  } else {
    current.innerText = `${realTemperature}°F`;
  }

  feelsLike.innerText = `Feels like ${feelsLikeTemperature} degrees ${unit}`;
}

async function updateLocationInfo(weather) {}

function getDegreeUnit() {
  const radioButtons = document.getElementsByName('temp');
  const celsius = radioButtons[0];

  if (celsius.checked) return 'Celsius';
  return 'Fahrenheit';
}
