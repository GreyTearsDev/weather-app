'use strict';
import './styles.css';
import { getCityNameFromUserInput } from './util.mjs';
import getWeather from './weather.mjs';

const searchBtn = document.querySelector('.form__button');
searchBtn.addEventListener('click', async function () {
  const cityName = getCityNameFromUserInput();
  const weatherData = await getWeather(cityName);
  console.log(weatherData);
});
