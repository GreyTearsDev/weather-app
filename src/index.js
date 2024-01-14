'use strict';
import './styles.css';
import { updateInfoOnScreen } from './render.mjs';
import { loadDefaultWeatherData } from './render.mjs';

window.onload = () => {
  loadDefaultWeatherData();
};

const searchBtn = document.querySelector('.form__button');
searchBtn.addEventListener('click', async function () {
  updateInfoOnScreen();
});
