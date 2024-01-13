/**
 * Gets (from geocoding-api's API) the coordinates of a city passed as argument
 * to the function
 *
 * @param {string} cityName Name of the city
 * @returns An object named "coordinates" containing relevant information
 */
async function getCoordinates(cityName) {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`
    );
    const cityInformation = await response.json();
    const { latitude, longitude } = cityInformation.results[0];
    const coordinates = { latitude, longitude };
    return coordinates;
  } catch (e) {
    console.error(e);
  }
}

function getWeatherInfo(coordinates) {}

fetchCityCoordinates('sdfo').then((data) => console.log(data));

function fetchWeatherData(location) {}

// fetchCityLocation('lobito')
//   .then((response) => response.json())
//   .then((response) => {
//     const { latitude, longitude } = response.results[0];
//     const cityCoordinates = []
//   });
