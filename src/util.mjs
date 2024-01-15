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
  const radioButtons = document.getElementsByName('temp');
  // Get the first radio button (assumes it represents Celsius)
  const celsius = radioButtons[0];

  if (celsius.checked) return 'Celsius';

  // If Celsius is not selected, assume Fahrenheit is selected
  return 'Fahrenheit';
}

export function getVisibilityUnit() {
  const radioButtons = document.getElementsByName('temp');
  // Get the first radio button (assumes it represents Celsius)
  const celsius = radioButtons[0];

  if (celsius.checked) return 'kilometers';

  // If Celsius is not selected, assume Fahrenheit is selected
  return 'miles';
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
 * Retrieves the local time from the provided weather data.
 *
 * @param {Object} weather - The weather data object containing current conditions.
 * @returns The local time in the location specified by the weather data.
 */
export function getLocalTime(weather) {
  return weather.location.localTime;
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

  if (unit === 'kilometers') {
    return weather.current.visibility[`${unit}`];
  }

  return weather.current.visibility[`${unit}`];
}
