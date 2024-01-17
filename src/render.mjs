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
      if (data === undefined || data === null) return;
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
  } catch (e) {}
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

/**
 * Displays an error message on the webpage based on the provided message.
 *
 * @param {string} message - The error message to be displayed.
 * @returns {void}
 */
export function displayErrorMessage(message) {
  const errorMessage = document.querySelector('.error-msg');
  const errorContainer = document.querySelector('.error-container');
  // Check if the message is related to a location not found error
  if (message == 'Error: Location Not Found') {
    errorMessage.innerText = 'Location not found!';
    errorMessage.style.display = 'block';
    errorContainer.style.display = 'block';

    return;
  }

  errorMessage.innerText = 'Something went wrong!';
  errorMessage.style.display = 'block';
  errorContainer.style.display = 'block';
}

/**
 * Erases the displayed error message on the webpage.
 *
 * @returns {void}
 */
export function eraseErrorMessage() {
  const errorMessage = document.querySelector('.error-container');
  const errorContainer = document.querySelector('.error-container');

  errorMessage.innerText = '';
  errorMessage.style.display = 'none';
  errorContainer.style.display = 'none';
}
