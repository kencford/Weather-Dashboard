console.log('Javascript code starts here.');

// Using Open Weather Map
let OWM_apiKey = "60e388d13d87f9eee3a6915e90a44ff7";

var dateToday = new Date();
var urlIcon = "https://openweathermap.org/img/w/";
var icon = "10d";
var searchBtn = document.getElementById("search-button");

let fromInput = document.getElementById("search-input");

const weatherContainer = document.getElementById("current");

let cityEl = document.createElement("p");
let bodyToday = document.createElement("div");
let dateIcon = document.createElement("h2");
let weatherIcon = document.createElement("img");
let tempEl = document.createElement("p");
let windEl = document.createElement("p");
let humidityEl = document.createElement("p");
let uvEl = document.createElement("p");
let forecast = document.getElementById("forcast");

function getWeather() {
    weatherContainer.innerHTML = "";
    
    let userSearch = fromInput.value;
    let city = userSearch.split(" ").join("+");
    console.log("city: ", city);
    var baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OWM_apiKey}&units=imperial`;
    console.log(baseURL);

    fetch(baseURL)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        weatherContainer.append(bodyToday);

                        console.log(data);
                        // city
                        // let apiCity = ("Today's Weather in " + city);
                        bodyToday.append(cityEl);
                        cityEl.innerHTML = `Today's Weather in ${data.name}`;
                        // temp
                        bodyToday.append(tempEl);
                        let temperature = Math.floor(data.main.temp) + " F";
                        tempEl.append("Temp: " + temperature);

                        //wind
                        let wind = data.wind.speed;
                        bodyToday.append(windEl);
                        windEl.append("Wind: " + wind + " MPH");

                        //humidity
                        let humidity = data.main.humidity;
                        bodyToday.append(humidityEl);
                        humidityEl.append("Humidity: " + humidity + "%");

                        //lat lon
                        let lat = data.coord.lat;
                        let lon = data.coord.lon;
                        console.log("lat", lat);

                        getUV(lat, lon);
                        //uv index
                    })
            }
        })
        function getFiveDay() {
            let fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OWM_apiKey}&units=imperial`;
            fetch(fiveDayURL)
            .then(function (response) {
                if (response.ok) {
                    response.json()
                        .then(function (data) {
                            var getFiveData = data;
                            getFiveData.length = 5;
                            console.log(getFiveData);
                        for (let i=0; i< getFiveData.length; i++) {
                            var result = getFiveData;
                            // var date = 
                            // var time
                            var weatherIcon = (result.list[i].weather[0].icon);
                            var iconURL = (`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
                            var windSpeed = (`Wind Speed: ${result.list[i].wind.speed}MPH`);
                            var humidity = (`Humidity: ${result.list[i].main.humidity}%`);
                            var fiveDayTemp = (`Temperature: ${result.list[i].main.temp}F`);
                            console.log(fiveDayTemp);
                            forecast.append(
                                `<div class="card"> 
                                <img src="${iconURL}" />
                                <div class="humidity">${humidity}</div>
                                <div class="temp">${fiveDayTemp}</div>
                                <div class="wind">${windSpeed}</div>
                                </div>`
                            )
                        }
                        })
                    }
                })
        }
        getFiveDay();
         
        
}

function getUV(lat, lon) {
    let uvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${OWM_apiKey}`
    fetch(uvUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data);
                        uvEl.innerHTML = `UV index is: ${data.value}`;
                        bodyToday.append(uvEl);
                    })
                }
            })
}


// const newLocal = "search-form";
// let fromLabel = document.getElementById(newLocal);



searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    tempEl.innerHTML = "";
    windEl.innerHTML = "";
    humidityEl.innerHTML = "";
    getWeather();
    fromInput.value = "";

})

