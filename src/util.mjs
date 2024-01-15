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
export function getImageCode(weatherInfo) {
  const weatherCode = weatherInfo.current.code;
  const imageCode = weatherInfo.current.codeToIcon[`${weatherCode}`];
  return imageCode;
}

/**
 * Imports all images matching the provided webpack require context.
 *
 * This function takes a webpack require context (`require.context`) and maps
 * over all matched module request strings, effectively importing all images
 * that match the specified context. The result is an array of imported images.
 *
 * @param {Function} r - Webpack require context function.
 * @returns {Array} An array containing all imported images.
 */
export function importAllImages(r) {
  return r.keys().map(r);
}
