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
  clearData();

  const params = new URLSearchParams({
    q: valueInput.location,
  });

  setLoading(loadingElement);
  const geonamesData = await clientServices.get(`/geonames/search?${params}`);
  console.log("geonamesData", geonamesData);
  const weatherParams = new URLSearchParams({
    lat: geonamesData.geonames[0].lat,
    lon: geonamesData.geonames[0].lng,
  });

  const weatherData = await clientServices.get(`/weather/search?${weatherParams}`);
  console.log("weatherData", weatherData);
  const pixaParams = new URLSearchParams({
    q: weatherData.city_name,
  });
  const pixabayData = await clientServices.get(`/pixabay/search?${pixaParams}`);
  console.log("pixabayData", pixabayData);
  resultsElement.style.display = "block";
  if (pixabayData.hits.length === 0) {
    resultsElement.innerHTML = `
    No data
    `;
  } else {
    resultsElement.innerHTML = `
    <section style="display: block;" id="results">
                    <div class="card">
                        <div class="card-img">
                          <img src="${pixabayData.hits[0].largeImageURL}" />
                            <div class="card-action">
                                <p href="">+ add lodging info</p>
                                <p href="">+ add packing list</p>
                                <p href="">+ add notes</p>
                            </div>
                        </div>
                        <div class="card-body">
                            <p class="card-text">My trip to : <b>${geonamesData.geonames[0].asciiName} ,
                            ${geonamesData.geonames[0].adminName1} , ${geonamesData.geonames[0].countryName}</b></p>
                            <p class="card-text">Departing : <b>${valueInput.date}</b></p>
                            <div class="card-infor">
                                <p>Geography infor:</p>
                                <ul>
                                    <li>lat: ${geonamesData.geonames[0].lat}</li>
                                    <li>lng: ${geonamesData.geonames[0].lng}</li>
                                    <li>country code: ${geonamesData.geonames[0].countryCode}</li>
                                </ul>
                            </div>
                            <div class="card-btn">
                                <button>Save trip</button>
                            </div>
                            <p class="card-text">Weather infor : </p>
                            <p class="card-text">City : ${weatherData.city_name}</p>
                            <p class="card-text">Date : ${weatherData.data[0].datetime}</p>
                            <ul class="card-weather">
                                <li>Temperature : ${weatherData.data[0].temp}</li>
                                <li><span>Hight: ${weatherData.data[0].high_temp}</span> / <span>Low: ${weatherData.data[0].low_temp}</span> </li>
                                <li>Description: ${weatherData.data[0].weather.description} </li>
                            </ul>
                        </div>
                    </div>
                </section>
    
    `;
  }
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
};

export { handleSearch };
