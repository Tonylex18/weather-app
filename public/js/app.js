var weatherApi = "/weather";
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');
const tempElement = document.querySelector('.temperature span');

const locationElement = document.querySelector('.place');
const dateElement = document.querySelector('.date');

const currentDate = new Date();
// TO get just the month and the day
const options = { month: "long" };
const monthName = currentDate.toLocaleString('en-US', options)

dateElement.textContent = currentDate.getDate() + ", " + monthName;

// Show user location details by default
if("geolocation" in navigator) {
    locationElement.textContent = "Loading...";
    navigator.geolocation.getCurrentPosition(
        function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
        
            fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.address && data.address.city) {
                    const city = data.address.city;
                    showData(city);
                } else {
                    locationElement.textContent = "City not found";
                }
            }).catch((error) => {
                console.log(error);
            })
        },
        function (error) {
            console.log(error.message);
        }
    )
} else {
    locationElement.textContent = "Geolocation is not available"
}

// Handle submit handler
weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log(search.value);

    locationElement.textContent = "Loading...";
    weatherIcon.className = "";
    tempElement.textContent = "";
    weatherCondition.textContent = "";

    showData(search.value);
})

// A new function that will be use to fetch the API data
function showData(city) {
    // Cause both front and back end are running on same host, no need for domain name.

    getWeatherData(city, (result) => {
        // console.log(result);
        if (result.cod = 200) {

            if (result.weather[0].description == "rain" || result.weather[0].description == "fog") {
                weatherIcon.className = "wi wi-day-" + result.weather[0].description; 
            } else {
                weatherIcon.className = "wi wi-day-cloudy";
            }

            locationElement.textContent = result?.name;

            tempElement.textContent = (result?.main?.temp - 273.5).toFixed(2) + String.fromCharCode(176) + "C";
            weatherCondition.textContent = result?.weather[0]?.description?.toUpperCase();

        } else {
            locationElement.textContent = "City not found";
        }
    })
}

function getWeatherData(city, callback) {
    const locationApi = weatherApi + "?address=" + city
    fetch(locationApi).then((response) => {
        response.json().then((response) => {
            callback(response);
        })
    })
}