var baseURL = "http://localhost:8080";
function ClientServices() {

  const get = async (url) => {
    return fetch(baseURL + url, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => response.json());
  };

  const post = async (url, data) => {
    return fetch(baseURL + url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return {
    get,
    post,
  };
}
const clientServices = new ClientServices();
export default clientServices;
