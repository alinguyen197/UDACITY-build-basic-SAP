import clientServices from "./js/clientServices";
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
// test("api weather ", () => {
//   expect(sum(1, 2)).toBe(3);
// });

test("api geonames", async () => {
  const params = new URLSearchParams({
    q: "Tokyo",
  });
  const geonamesData = await get(`/geonames/search?${params}`);
  expect(geonamesData.geonames.length).not.toEqual(0)
})

test("api weather", async () => {
  const weatherParams = new URLSearchParams({
    lat:  '35.6895',
    lon: '139.69171',
  });
  const weatherData = await get(`/weather/search?${weatherParams}`);
  expect(weatherData.city_name).toEqual('Tokyo')
})



// examples
// test("object assignment", () => {
//   const data = { one: 1 };
//   data["two"] = 2;
//   expect(data).toBe({ one: 1, two: 2 }); // Sẽ fail vì hai object không giống nhau về tham chiếu
// });

// describe("_getUsers", () => {
//   it("will return data users", async () => {
//     const result = await _getUsers();
//     const getLengthOfResult = Object.keys(result).length;
//     expect(getLengthOfResult).toEqual(4);
//   });
// });
