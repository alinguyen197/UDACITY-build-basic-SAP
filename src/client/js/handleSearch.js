import clientServices from "./clientServices";
const btnElement = document.getElementById("search-btn");
btnElement.addEventListener("click", handleSearch);

async function handleSearch(e) {
  e.preventDefault();
  const data = {};
  const forms = document.querySelectorAll("input[type=text]");
  forms.forEach((form) => {
    data[form.name] = form.value;
  });
  const params = new URLSearchParams({
    q: data.location,
});
  const a = await clientServices.get(`/geonames/search?${params}`).then(response => response.json());
}

export { handleSearch };
