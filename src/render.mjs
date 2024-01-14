import { getCityNameFromUserInput } from './util.mjs';
import getWeather from './weather.mjs';

export async function updateInfoOnScreen() {
  const cityName = getCityNameFromUserInput();
  const weather = await getWeather(cityName);
  displayMainInfo(weather);
}

/**
 * Displays main weather information on the webpage.
 *
 * @param {Object} weather - The weather data object containing current conditions.
 */
function displayMainInfo(weather) {
  const current = document.getElementById('current-temperature');
  const feelsLike = document.getElementById('feels-like-temperature');
  const region = document.getElementById('region');
  const localTime = document.getElementById('localtime');
  const city = document.getElementById('city');

  // Determine the selected temperature unit (Celsius or Fahrenheit)
  const unit = getDegreeUnit();
  const realTemperature = weather.current.temperature.real[`degrees${unit}`];
  const feelsLikeTemperature =
    weather.current.temperature.feelsLike[`degrees${unit}`];

  console.log(weather);

  if (unit === 'Celsius') {
    current.innerText = `${realTemperature}°C`;
    feelsLike.innerText = `Feels like ${feelsLikeTemperature}°C`;
  } else {
    current.innerText = `${realTemperature}°F`;
    feelsLike.innerText = `Feels like ${feelsLikeTemperature}°F`;
  }

  city.innerText = `${weather.location.city}`;
  region.innerText = `${weather.location.region} - ${weather.location.country}`;
  localTime.innerText = `${weather.location.localTime}`;
}

async function updateLocationInfo(weather) {}

/**
 * Retrieves the selected temperature unit (Celsius or Fahrenheit)
 * from a group of radio buttons.
 *
 * @returns {String} The selected temperature unit.
 */
function getDegreeUnit() {
  const radioButtons = document.getElementsByName('temp');
  // Get the first radio button (assumes it represents Celsius)
  const celsius = radioButtons[0];

  if (celsius.checked) return 'Celsius';

  // If Celsius is not selected, assume Fahrenheit is selected
  return 'Fahrenheit';
}

export async function loadDefaultWeatherData() {
  const cityName = 'lobito';
  const weather = await getWeather(cityName);
  displayMainInfo(weather);
}
