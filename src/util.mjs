/**
 * Retrieves the value from the input field in the form.
 *
 * @returns {String} The city name entered by the user.
 */
export function getCityNameFromUserInput() {
  const inputField = document.querySelector('.form__input');
  return inputField.value;
}

/**
 * Determines if it is currently day or night based on the provided weather data.
 *
 * @param {Object} weather - The weather data object containing current conditions.
 * @returns {Boolean} True if it is currently day, false if it is night.
 */
export function isDay(weather) {
  return weather.current.isDay === 1 ? true : false;
}

/**
 * Retrieves the image code corresponding to the current weather conditions.
 *
 * This function takes in a weather information object and extracts the weather code.
 * It then uses the code to look up the corresponding image code from the provided
 * code-to-icon mapping. The resulting image code is returned.
 *
 * @param {Object} weatherInfo - The weather information object.
 * @returns {string} The image code associated with the current weather conditions.
 */
function getImageCode(weatherInfo) {
  const weatherCode = weatherInfo.current.code;
  const imageCode = weatherInfo.current.codeToIcon[`${weatherCode}`];
  return imageCode;
}

/**
 * Renders the weather icon on the webpage based on the current weather conditions.
 *
 * This function dynamically loads and displays a weather icon based on the provided
 * weather data. It uses the image code retrieved from the weather information and
 * determines whether it is day or night to select the appropriate icon.
 *
 * @param {Object} weather - The weather data object containing current conditions.
 */
export function renderWeatherIcon(weather) {
  const icon = document.getElementById('weather-icon');
  const imgCode = getImageCode(weather);
  const period = weather.current.isDay ? 'day' : 'night';

  import(`/src/icons/64x64/${period}/${imgCode}.png`)
    .then((image) => {
      // Set the image source once it's loaded
      icon.src = image.default;
    })
    .catch((error) => {
      console.error('Error loading image:', error);
    });
}

/**
 * Retrieves the selected temperature unit (Celsius or Fahrenheit)
 * from a group of radio buttons.
 *
 * @returns {String} The selected temperature unit.
 */
export function getDegreeUnit() {
  const system = getPreferredSystem();
  return system == 'metric' ? 'Celsius' : 'Fahrenheit';
}

/**
 * Retrieves the visibility unit based on the selected radio button.
 *
 * This function checks the state of a group of radio buttons to determine the
 * preferred visibility unit ('kilometers' or 'miles').
 *
 * @returns {String} The visibility unit, either 'kilometers' or 'miles'.
 */
export function getVisibilityUnit() {
  const system = getPreferredSystem();
  return system == 'metric' ? 'km' : 'mi';
}

/**
 * Retrieves the visibility value from the provided weather data.
 *
 * This function considers the visibility unit and returns the corresponding value.
 *
 * @param {Object} weather - The weather data object containing current conditions.
 * @returns The visibility value based on the unit specified in the weather data.
 */
export function getVisibility(weather) {
  /**
   * Determines the visibility unit (either 'kilometers' or 'miles') from the weather data.
   * @type {String}
   */
  const unit = getVisibilityUnit();

  if (unit === 'km') {
    return weather.current.visibility[`${unit}`];
  }

  return weather.current.visibility[`${unit}`];
}

/**
 * Retrieves the wind velocity from the provided weather data.
 *
 * @param {Object} weather - The weather data object containing current conditions.
 * @returns The wind velocity value based on the unit specified in the weather data.
 */
export function getWindVelocity(weather) {
  const unit = getWindUnit();
  return weather.current.wind[`${unit}`];
}

/**
 * Retrieves the wind unit (kilometers per hour or miles per hour) based on user preference.
 *
 * @returns {String} The wind unit, either 'kph' or 'mph'.
 */
export function getWindUnit() {
  const system = getPreferredSystem();
  return system == 'metric' ? 'kph' : 'mph';
}

/**
 * Retrieves the preferred system (metric or imperial) based on user preference.
 *
 * @returns {String} The preferred system, either 'metric' or 'imperial'.
 */
export function getPreferredSystem() {
  const radioButtons = document.getElementsByName('temp');
  const metric = radioButtons[0];
  return metric.checked ? 'metric' : 'imperial';
}

/**
 * Retrieves the feels-like temperature from the provided weather data.
 *
 * @param {Object} weather - The weather data object containing current conditions.
 * @param {String} unit - The temperature unit to retrieve ('Celsius' or 'Fahrenheit').
 * @returns The feels-like temperature in the specified unit.
 */
export function getFeelsLikeTemperature(weather) {
  const unit = getDegreeUnit();
  return weather.current.temperature.feelsLike[`degrees${unit}`];
}

/**
 * Retrieves the real temperature from the provided weather data.
 *
 * @param {Object} weather - The weather data object containing current conditions.
 * @param {String} unit - The temperature unit to retrieve ('Celsius' or 'Fahrenheit').
 * @returns The real temperature in the specified unit.
 */
export function getRealTemperature(weather) {
  const unit = getDegreeUnit();
  return weather.current.temperature.real[`degrees${unit}`];
}

/**
 * Retrieves the city name from the provided weather data.
 *
 * @param {Object} weather - The weather data object containing current conditions.
 * @returns The name of the city.
 */
export function getCityName(weather) {
  return weather.location.city;
}

/**
 * Retrieves the region name from the provided weather data.
 *
 * @param {Object} weather - The weather data object containing current conditions.
 * @returns The name of the region.
 */
export function getRegionName(weather) {
  return weather.location.region;
}

/**
 * Retrieves the country name from the provided weather data.
 *
 * @param {Object} weather - The weather data object containing current conditions.
 * @returns The name of the country.
 */
export function getCountry(weather) {
  return weather.location.country;
}

/**
 * Retrieves the weather condition from the provided weather data.
 *
 * @param {Object} weather - The weather data object containing current conditions.
 * @returns The current weather condition.
 */
export function getWeatherCondition(weather) {
  return weather.current.condition;
}

/**
 * Retrieves the humidity value from the provided weather data.
 *
 * @param {Object} weather - The weather data object containing current conditions.
 * @returns The humidity value as a percentage.
 */
export function getHumidity(weather) {
  return weather.current.humidity;
}

/**
 * Highlights the active system preference on the webpage.
 *
 * This function dynamically manages the visual representation of the user's preferred
 * system—either metric or imperial. It applies and removes specific CSS classes to
 * accentuate the active system, ensuring a clear and aesthetically coherent user
 * experience. The function intelligently selects and manipulates DOM elements such
 * as labels and containers to reflect the currently favored system of measurement.
 *
 * @returns {void}
 */
export function highlightSystemInUse() {
  const metricLabel = document.querySelector('.unit--metric');
  const imperialLabel = document.querySelector('.unit--imperial');
  const metricContainer = document.querySelector('.system-container--metric');
  const imperialContainer = document.querySelector(
    '.system-container--imperial'
  );

  if (getPreferredSystem() === 'metric') {
    metricLabel.classList.add('active-system');
    metricContainer.classList.add('active-system');
    try {
      imperialLabel.classList.remove('active-system');
      imperialContainer.classList.remove('active-system');
    } catch (e) {
      console.error(e);
    }
  } else {
    imperialLabel.classList.add('active-system');
    imperialContainer.classList.add('active-system');
    try {
      metricLabel.classList.remove('active-system');
      metricContainer.classList.remove('active-system');
    } catch (e) {
      console.error(e);
    }
  }
}
