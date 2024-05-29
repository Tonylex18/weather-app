// request is use to call a third party API
const request = require('request');

// using the openweathermap to get API key
const openweathermap = {
    BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
    SECRET_KEY: "46a3843be14e11835296384ea24fd31e",
}

const weatherData = (address, callback) => {
    const url = 
    openweathermap.BASE_URL + 
    encodeURIComponent(address) + "&APPID=" + 
    openweathermap.SECRET_KEY;
    console.log(url);

    request({url, json: true}, (error, data) => {
        if(error) {
            callback(true, "Unable to fetch data, please try again" + error)
        }
        callback(false, data?.body);
    })
}

module.exports = weatherData;