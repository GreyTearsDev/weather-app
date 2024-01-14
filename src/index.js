'use strict';
import './styles.css';
import getCurrentWeather from './city-data.mjs';
import { getCityNameFromUserInput } from './util.mjs';
import { loadInitialWeatherData } from './util.mjs';

loadInitialWeatherData();

const searchBtn = document.querySelector('.form__button');
searchBtn.addEventListener('click', async function () {
  const cityName = getCityNameFromUserInput();
  const weatherData = await getCurrentWeather(cityName);
  console.log(weatherData);
});
