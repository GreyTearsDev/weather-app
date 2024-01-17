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
  getWindVelocity,
  getWindUnit,
} from './util.mjs';

/**
 * Updates the weather information displayed on the webpage based on user input.
 * If no city name is provided, it defaults to 'lobito'.
 */
export async function updateInfoOnScreen() {
  let currentDefaultCity = 'lobito';
  const cityName = getCityNameFromUserInput();

  if (cityName === '') {
    getWeather(currentDefaultCity)
      .then(displayMainInfo)
      .catch((err) => console.error(err));
    return;
  }

  getWeather(cityName)
    .then((data) => {
      if (data === undefined) return;
      displayMainInfo(data);
      currentDefaultCity = cityName;
    })
    .catch((data) => {
      displayErrorMessage(data);
      setTimeout(eraseErrorMessage, 5000);
    });
}

/**
 * Displays main weather information on the webpage.
 *
 * @param {Object} weather - The weather data object containing current conditions.
 */
function displayMainInfo(weather) {
  try {
    // DOM elements
    const current = document.getElementById('current-temperature');
    const feelsLike = document.getElementById('feels-like-temperature');
    const region = document.getElementById('region');
    const city = document.getElementById('city');
    const humidity = document.getElementById('humidity');
    const weatherCondition = document.getElementById('condition');
    const visibility = document.getElementById('visibility-level');
    const wind = document.getElementById('wind-speed');

    // Weather data and units
    const degreeUnit = getDegreeUnit();
    const realTemperature = getRealTemperature(weather);
    const feelsLikeTemperature = getFeelsLikeTemperature(weather);

    // Display temperature based on the selected unit
    if (degreeUnit === 'Celsius') {
      current.innerText = `${realTemperature}°C`;
      feelsLike.innerText = `Feels like ${feelsLikeTemperature}°C`;
    } else {
      current.innerText = `${realTemperature}°F`;
      feelsLike.innerText = `Feels like ${feelsLikeTemperature}°F`;
    }

    renderWeatherIcon(weather);

    // Display additional weather details
    visibility.innerText = `Visibility: ${getVisibility(
      weather
    )} ${getVisibilityUnit(weather)}`;
    wind.innerText = `Wind velocity: ${getWindVelocity(
      weather
    )} ${getWindUnit()}`;
    humidity.innerText = `Humidity: ${getHumidity(weather)}%`;
    weatherCondition.innerText = getWeatherCondition(weather);
    city.innerText = getCityName(weather);
    region.innerText = `${getRegionName(weather)} - ${getCountry(weather)}`;
  } catch (e) {
    console.error(`${e.name}: ${e.message}`);
  }
}

/**
 * Loads default weather data for the city 'lobito' on page load.
 */
export async function loadDefaultWeatherData() {
  const cityName = 'lobito';
  const weather = await getWeather(cityName);
  displayMainInfo(weather);
}

// Event listener for temperature unit switcher
const radioButtons = document.getElementsByName('temp');
radioButtons.forEach((button) =>
  button.addEventListener('click', function () {
    updateInfoOnScreen();
  })
);

export function displayErrorMessage(message) {
  const errorMessage = document.querySelector('.error-msg');
  errorMessage.innerText = message;
}

export function eraseErrorMessage() {
  const errorMessage = document.querySelector('.error-msg');
  errorMessage.innerText = '';
}
