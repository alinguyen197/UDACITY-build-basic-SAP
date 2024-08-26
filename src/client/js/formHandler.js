function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("name").value;

  Client.checkForName(formText);

  console.log("::: Form Submitted :::");
  fetch("http://localhost:8081/test", {
    method: "POST",
    body: JSON.stringify(data),
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
        console.log(res,'xxx')
      return res.json();
    })
    .then(function (data) {
      document.getElementById("results").innerHTML = data.message;
    });
}

export { handleSubmit };
