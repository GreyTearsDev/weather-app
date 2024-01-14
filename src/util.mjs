/**
 * Retrieves the value from the input field in the form.
 *
 * @returns {String} The city name entered by the user.
 */
export function getCityNameFromUserInput() {
  const inputField = document.querySelector('.form__input');
  return inputField.value;
}
