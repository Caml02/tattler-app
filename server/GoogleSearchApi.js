// GoogleSearchApi.js
const SerpApi = require('google-search-results-nodejs');
require('dotenv').config();

function googleSearch(engine, q, latitude, longitude, openStateFilter) {
  return new Promise((resolve, reject) => {
    const search = new SerpApi.GoogleSearch(process.env.REACT_APP_SERPAPI_KEY);

    const params = {
      engine,
      q,
      ll: `@${latitude},${longitude},15.1z`,
      type: "search",
      hl: "es",
      open_state: openStateFilter || undefined, // Agrega el filtro si está definido, o lo omite si es null o undefined
    };

    search.json(params, (data) => {
      resolve(data);
    });
  });
}

module.exports = googleSearch;
