'use strict';
import './styles.css';
import getCurrentWeather from './city-data.mjs';
import { getCityNameFromFormInput } from './util.mjs';

const searchBtn = document.querySelector('.form__button');
searchBtn.addEventListener('click', async function () {
  const cityName = getCityNameFromFormInput();
  const weatherData = await getCurrentWeather(cityName);
  console.log(weatherData);
});
