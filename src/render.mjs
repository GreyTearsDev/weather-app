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

  // Determine the selected temperature unit (Celsius or Fahrenheit)
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
