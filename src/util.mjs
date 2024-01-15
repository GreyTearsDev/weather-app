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
      console.log(image);
      icon.src = image.default;
    })
    .catch((error) => {
      console.error('Error loading image:', error);
    });
}
