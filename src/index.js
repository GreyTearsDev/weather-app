'use strict';
import './styles.css';
import { updateInfoOnScreen } from './render.mjs';
import { loadDefaultWeatherData } from './render.mjs';

/**
 * Loads default weather data for the initial application state.
 */
loadDefaultWeatherData();

/**
 * Adds an event listener to the search button, triggering the update of weather information on screen.
 */
const searchBtn = document.querySelector('.form__button');
searchBtn.addEventListener('click', async function () {
  updateInfoOnScreen();
});
