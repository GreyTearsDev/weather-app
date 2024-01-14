/**
 * Gets (from https://api.weatherapi.com)
 * the weather data for a city
 *
 * @param {string} cityName Name of the city
 * @returns A promise for the data about the weather
 */
export default async function getCurrentWeather(cityName) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=998c75f5d06b4a84ae245051241201&q=${cityName}`
    );
    return response.json();
  } catch (e) {
    console.error(e);
  }
}

// getCoordinates('lobito').then((coordinates) => getWeatherInfo(coordinates));

// fetchCityLocation('lobito')
//   .then((response) => response.json())
//   .then((response) => {
//     const { latitude, longitude } = response.results[0];
//     const cityCoordinates = []
//   });
