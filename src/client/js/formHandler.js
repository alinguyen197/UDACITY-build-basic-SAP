function handleSubmit(event) {
  event.preventDefault();
  // check what text was put into the form field
  let formText = document.getElementById("name").value;

  Client.checkForName(formText);

  console.log("::: Form Submitted :::");
  fetch("http://localhost:8080/test")
    .then((res) => {
      return res.json();
    })
    .then(function (data) {
      console.log(data,'xxx')
      document.getElementById("results").innerHTML = data.message;
    });
}

function onBlur(event) {}

export { handleSubmit  , onBlur};
