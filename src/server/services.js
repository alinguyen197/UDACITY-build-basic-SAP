const fetch = require("node-fetch");
const geonamesAPI = {
  search: function (query) {
    return fetch(
      `http://api.geonames.org/searchJSON?formatted=true&q=${query}&maxRows=10&lang=es&username=alinguyen197&style=full`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => data);
  },
};

const weatherAPI = {};

const pixabayAPI = {};

module.exports = {
  geonamesAPI,
  weatherAPI,
  pixabayAPI,
};
