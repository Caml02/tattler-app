const SerpApi = require('google-search-results-nodejs');
require('dotenv').config();

function googleSearch(engine, q, latitude, longitude) {
  return new Promise((resolve, reject) => {
    const search = new SerpApi.GoogleSearch(process.env.REACT_APP_SERPAPI_KEY); 

    const params = {
      engine,
      q,
      ll: `@${latitude},${longitude},15.1z`,
      type: "search",
      hl: "es"
    };


    search.json(params, (data) => {
      resolve(data);
    });
  });
}

module.exports = googleSearch;
