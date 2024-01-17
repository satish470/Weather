let inp = document.getElementById("usrInp");
let searchBtn = document.getElementById("searchBtn");
let cityEl = document.getElementById("city")

let weatherEl = document.getElementById("weth");
let temperatureEl = document.getElementById("temp");
let maxTempEl = document.getElementById("highTemp");
let minTempEl = document.getElementById("lowTemp")

let humidityEl = document.getElementById("humi");
let windSpeedEl = document.getElementById("wind");

let pressureEl = document.getElementById("pressu");


function appendweatherData(data) {
    let weather = data.weather[0].main;
    let
        feelslike_c = data.main.feels_like,
        humidity = data.main.humidity,
        wind_kph = data.wind.speed,
        cityName = data.name,
        tempMax = data.main.temp_max,
        temmpMin = data.main.temp_min,
        pressure = data.main.pressure;

    cityEl.textContent = cityName;
    weatherEl.textContent = weather;
    temperatureEl.textContent = feelslike_c + "° C";
    maxTempEl.textContent = tempMax + "° C";
    minTempEl.textContent = temmpMin + "° C";

    humidityEl.textContent = humidity + " hPa";
    windSpeedEl.textContent = wind_kph + " m/s";
    pressureEl.textContent = pressure;
}

async function getWeather(city) {
    //weather API 
    //let weatherUrl = 'https://api.weatherapi.com/v1/current.json?key=6cdd75aa71e94b01be5153338241601&q=' + city;

    // Open Weather API
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=4b596cc96f6a203c4c0ed2d6ef6d744e`;
    let request = await fetch(weatherUrl);
    let responce = await request.json();
    try {
        console.log(responce)
        appendweatherData(responce);
    } catch {
        console.log("Error!!!!!");

    }

}
async function local() {
    const request = await fetch("https://ipinfo.io/json?token=25cf52ac737d76");
    const jsonResponse = await request.json();
    console.log(jsonResponse);
    getWeather(jsonResponse.city);

}
local()



searchBtn.onclick = function() {
    let inpVal = inp.value;
    console.log(inpVal);
    getWeather(inpVal);
    inp.value = ""
}
