import fetch from "node-fetch";
var baseURL = "http://localhost:8080";
const get = async (url) => {
  return fetch(baseURL + url, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(response => response.json());
};

test("test api geonames", async () => {
  const params = new URLSearchParams({
    q: "Tokyo",
  });
  const geonamesData = await get(`/geonames/search?${params}`);
  expect(geonamesData.geonames.length).not.toEqual(0)
})

test("test api weather", async () => {
  const weatherParams = new URLSearchParams({
    lat:  '35.6895',
    lon: '139.69171',
  });
  const weatherData = await get(`/weather/search?${weatherParams}`);
  expect(weatherData.city_name).toEqual('Tokyo')
})

test("test api pixabay", async () => {
  const pixaParams = new URLSearchParams({
    q: 'Tokyo',
  });
  const pixabayData = await get(`/pixabay/search?${pixaParams}`);
  expect(pixabayData.hits.length).not.toEqual(0)
})