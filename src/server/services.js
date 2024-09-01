const fetch = require("node-fetch");
const geonamesAPI = {
  username: "alinguyen197",
  search: function (query) {
    return fetch(
      `http://api.geonames.org/searchJSON?formatted=true&q=${query}&maxRows=10&lang=es&username=${this.username}&style=full`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => data);
  },
};

const weatherAPI = {
  key: "1f331527362d4e339b251cdbca256275",
  getWeather: function (lat, lon) {
    return fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${this.key}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => data);
  },
};

const pixabayAPI = {
  getImage: function (location) {
    return fetch(
      `https://pixabay.com/api/?key=24377852-07552f4406f3b56731a65e887&q=${location}&image_type=photo&pretty=true`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => data);
  },
};

module.exports = {
  geonamesAPI,
  weatherAPI,
  pixabayAPI,
};
