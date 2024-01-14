import getCurrentWeather from './city-data.mjs';

export function getCityNameFromUserInput() {
  return document.querySelector('.form__input').value;
}

export async function loadInitialWeatherData() {
  const cityName = 'lobito';
  const weather = await getCurrentWeather(cityName);
  displayWeather(weather);
}

function displayWeather(weatherInfo) {
  console.log(weatherInfo.location);
}
