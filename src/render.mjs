import getWeather from './weather.mjs';
import {
  renderWeatherIcon,
  getDegreeUnit,
  getFeelsLikeTemperature,
  getRealTemperature,
  getWeatherCondition,
  getCityName,
  getCityNameFromUserInput,
  getRegionName,
  getCountry,
  getLocalTime,
  getHumidity,
  getVisibility,
  getVisibilityUnit,
} from './util.mjs';

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
  const humidity = document.getElementById('humidity');
  const weatherCondition = document.getElementById('condition');
  const visibility = document.getElementById('visibility-level');

  const visibilityUnit = getVisibilityUnit(weather);
  const degreeUnit = getDegreeUnit();
  const realTemperature = getRealTemperature(weather, degreeUnit);
  const feelsLikeTemperature = getFeelsLikeTemperature(weather, degreeUnit);

  if (degreeUnit === 'Celsius') {
    current.innerText = `${realTemperature}°C`;
    feelsLike.innerText = `Feels like ${feelsLikeTemperature}°C`;
  } else {
    current.innerText = `${realTemperature}°F`;
    feelsLike.innerText = `Feels like ${feelsLikeTemperature}°F`;
  }

  renderWeatherIcon(weather);
  visibility.innerText = `Visibility: ${getVisibility(
    weather
  )} ${getVisibilityUnit(weather)}`;
  humidity.innerText = `Humidity: ${getHumidity(weather)}%`;
  weatherCondition.innerText = getWeatherCondition(weather);
  city.innerText = getCityName(weather);
  region.innerText = `${getRegionName(weather)} - ${getCountry(weather)}`;
  localTime.innerText = `${getLocalTime(weather)}`;
}

export async function loadDefaultWeatherData() {
  const cityName = 'lobito';
  const weather = await getWeather(cityName);
  console.log(weather);
  displayMainInfo(weather);
}

const radioButtons = document.getElementsByName('temp');
radioButtons.forEach((button) =>
  button.addEventListener('click', function () {
    updateInfoOnScreen();
  })
);
