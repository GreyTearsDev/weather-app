'use strict';
import './styles.css';
import getCurrentWeather from './city-data.mjs';

const searchBtn = document.querySelector('.form__button');
searchBtn.addEventListener('click', async function () {
  const cityName = document.querySelector('.form__input').value;
  const weatherData = await getCurrentWeather(cityName);
  console.log(weatherData);
});
