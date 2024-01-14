import getCurrentWeather from './city-data.mjs';

function displayCurrentWeather(fetchWeatherData, cityName) {
  fetchWeatherData(cityName).then((data) => console.log(data));
}
