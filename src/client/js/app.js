import clientServices from "./clientServices";

const btnElement = document.getElementById("search-btn");
const errorElement = document.querySelector(".error");
const loadingElement = document.querySelector(".loading");
const forms = document.querySelectorAll("input[type=text]");
const resultsElement = document.getElementById("results");
btnElement.addEventListener("click", handleSearch);

async function handleSearch(e) {
  e.preventDefault();
  const valueInput = {};
  forms.forEach((form) => {
    valueInput[form.name] = form.value;
  });

  if (!valueInput.location || !valueInput.date) {
    errorElement.innerHTML = "Please input location and date !!!";
    return;
  }
  clearData()

  const params = new URLSearchParams({
    q: valueInput.location,
  });

  setLoading(loadingElement);
  const geonamesData = await clientServices.get(`/geonames/search?${params}`).then((response) => response.json());
  console.log("geonamesData", geonamesData);
  const weatherParams = new URLSearchParams({
    lat: geonamesData.geonames[0].lat,
    lon: geonamesData.geonames[0].lng,
  });
  
  const weatherData = await clientServices.get(`/weather/search?${weatherParams}`).then((response) => response.json());
  console.log("weatherData", weatherData);
  const pixaParams = new URLSearchParams({
    q: weatherData.city_name,
  });
  const pixabayData = await clientServices.get(`/pixabay/search?${pixaParams}`).then((response) => response.json());
  console.log("pixabayData", pixabayData);
  resultsElement.style.display = "block";
  resultsElement.innerHTML = `
  <img src="${pixabayData.hits[2].largeImageURL}" />
  `;
  hideLoading(loadingElement);
}

// Open loading
const setLoading = (loadingElement) => {
  loadingElement.style.display = " block";
};
// Close loading
const hideLoading = (loadingElement) => {
  loadingElement.style.display = " none";
};

const clearData = () => {
  resultsElement.innerHTML = "";
  errorElement.remove();
}

export { handleSearch };
