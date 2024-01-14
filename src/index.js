'use strict';
import './styles.css';
import { updateInfoOnScreen } from './render.mjs';

const searchBtn = document.querySelector('.form__button');
searchBtn.addEventListener('click', async function () {
  updateInfoOnScreen();
});
