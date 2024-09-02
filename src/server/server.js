var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
var bodyParser = require("body-parser");
var cors = require("cors");
const { geonamesAPI, weatherAPI, pixabayAPI } = require("./services.js");

var json = {
  title: "test json response",
  message: "this is a message",
  time: "now",
};

const app = express();
app.use(cors());
// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("dist"));

console.log(JSON.stringify(mockAPIResponse));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.get("/test", function (req, res) {
  res.json(mockAPIResponse);
});

// Geonames
app.get("/geonames/search", async function (req, res) {
  try {
    const location = req.query.q;
    const data = await geonamesAPI.search(location);
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// Weather
app.get("/weather/search", async function (req, res) {
  try {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const data = await weatherAPI.getWeather(lat,lon);
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// Pixabay
app.get("/pixabay/search", async function (req, res) {
  try {
    const location = req.query.q;
    const data = await pixabayAPI.getImage(location);
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// Example create route
app.get("/example", controller);
// Example create controller
function controller(req, res) {
  res.json({ x: "x" });
}

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});
