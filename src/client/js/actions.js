const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'b82c348c590a33150382c3d3b4b1d4e9&units=metric'; // Personal API Key for OpenWeatherMap API

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getFullYear() + '-' + pad(d.getMonth() + 1,2) + '-' + pad(d.getDate(),2);
let result =  document.getElementById('result');
result.style.display = 'none';

// add Event listener to search button
const btnSearch = document.getElementById('btnSearch');
btnSearch.addEventListener('click', search);

/* Search weather */
function search(e) {
    e.preventDefault();

    //get user input
    const cityZipcode = document.getElementById('cityZipcode').value;
    const feeling = document.getElementById('feeling').value;
    result.style.display = 'none';
    if (cityZipcode) {
        getWeatherData(weatherUrl, cityZipcode, apiKey)
            .then(function(data) {
                 // add data to POST request
                 var submitData = {
                    temp : data.main.temp,
                    date: newDate,
                    humidity: data.main.humidity,
                    content : feeling,
                }
                console.log(submitData);
                postData('/addData', submitData);
                
            }).then(function() {
                // render result
                updateResult()
            }).catch(function(error) {
                alert(' CAN NOT GET TEMPERATURE WITH YOUR INPUT.');
                console.log(error);

            });
    } else {
        generateBtn.classList.add('invalid');
    }


}

/* Function to GET Web API Data*/
const getWeatherData = async(weatherUrl, cityZipcode, apiKey) => {
    // res equals to the result of fetch function
    const res = await fetch(`${weatherUrl}?q=${cityZipcode}&appid=${apiKey}`);
    try {
        // data equals to the result of fetch function
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        
        console.log('error', error);
    }
};

/* POST data */
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            temp: data.temp,
            humidity: data.humidity,
            date: data.date,
            content: data.content
        })
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
};

const updateResult = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData);
        var date = document.getElementById('date');
        var temp = document.getElementById('temp');
        var humidity = document.getElementById('humidity');
        var content = document.getElementById('content');
        var errorMessage = document.getElementById('errorMessage');
        date.innerHTML = '';
        temp.innerHTML = '';
        content.innerHTML = '';
        humidity.innerHTML = '';
        // render new result
        if (allData.date && allData.temp) {
            result.style.display = 'block';
            date.innerHTML = allData.date;
            temp.innerHTML = allData.temp + '&#176;' + ' C';
            humidity.innerHTML = allData.humidity + ' %';
            if (allData.content) {
                content.innerHTML = allData.content;
            }
           
        }
    } catch (error) {
        console.log('error', error);
    }
};