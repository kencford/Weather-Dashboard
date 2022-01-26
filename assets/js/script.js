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
let forecast = document.getElementById("forecast");

var cityStorage = [];
var cityHistoryHTML = document.getElementById("history");

function getWeather(userSearch) {


    // userSearch = fromInput.value;
    let city = userSearch.split(" ").join("+");
    console.log("city: ", city);
    var baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OWM_apiKey}&units=imperial`;
    console.log(baseURL);

    setHistory(userSearch);

    fetch(baseURL)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        weatherContainer.innerHTML = "";
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
                            forecast.innerHTML="";
                            var result = data;
                            console.log('5-day data returned: ', result);

                            // data contains 40 objects separated by 3 hours
                            // need to get every 8th one (as 8 per day)
                            // also start with 9th entry to make sure next day
                            for (let i = 7; i < 40; i = i + 8) {
                                // var result = getFiveData;
                                var dateRaw = result.list[i].dt_txt;
                                // console.log("raw date: ", dateRaw);
                                var yyyy = dateRaw.substr(0, 4);
                                var mm = dateRaw.substr(5, 2);
                                var dd = dateRaw.substr(8, 2)
                                var dateOrdered = mm + '-' + dd + '-' + yyyy;

                                //ICON
                                var icon = document.createElement('img');
                                var weatherIcon = (result.list[i].weather[0].icon);
                                var iconURL = (`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
                                icon.src = iconURL;

                                //DATE
                                var date = document.createElement('div');
                                var dateDisplay = (`Date: ${dateOrdered}`);
                                date.innerHTML = dateDisplay;
                                // console.log(dateDisplay);
                                
                                // TEMP
                                var temp = document.createElement('div');
                                var fiveDayTemp = (`Temperature: ${result.list[i].main.temp}F`);
                                temp.innerHTML = fiveDayTemp;
                                console.log(fiveDayTemp);


                                //WIND
                                var wind = document.createElement('div');
                                var windSpeed = (`Wind Speed: ${result.list[i].wind.speed}MPH`);
                                wind.innerHTML = windSpeed;

                                //HUMIDITY
                                var percent = document.createElement('div');
                                var humidity = (`Humidity: ${result.list[i].main.humidity}%`);
                                percent.innerHTML = humidity;

                                //CARD
                                var card = document.createElement('div');
                                card.classList.add("card");
                                card.append(icon);
                                card.append(date);
                                card.append(wind);
                                card.append(humidity);
                                card.append(temp);

                                //CARD
                                forecast.append(card);
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

function setHistory(city) {
    if (cityStorage.indexOf(city) >= 0) {
        return;
    }
    cityStorage.push(city);

    localStorage.setItem("cities", JSON.stringify(cityStorage));
    getHistory(city);
}

function getHistory() {
    var fromLocal = localStorage.getItem("cities")
    if (fromLocal) {
        cityStorage = JSON.parse(fromLocal);
        console.log("cityStorage: ", cityStorage);
    }
    cityHistoryHTML.innerHTML = "";
    for (var i = 0; i < cityStorage.length; i++) {
        console.log("line 180: ", i);
        var cityBtn = document.createElement("button");
        cityBtn.classList.add("btn");
        cityBtn.classList.add("btn-md");
        cityBtn.classList.add("btn-primary");
        
        cityBtn.setAttribute("type", "button");
        cityBtn.setAttribute("data-search", cityStorage[i]);
        cityBtn.textContent = cityStorage[i];
        cityHistoryHTML.append(cityBtn);
    }
    console.log("cityHistoryHTML: ", cityHistoryHTML);
}

function historyBtn(e) {
    const btn = e.target;
    cityName = btn.getAttribute("data-search");
    getWeather(cityName);
}
cityHistoryHTML.addEventListener("click", historyBtn);
// const newLocal = "search-form";
// let fromLabel = document.getElementById(newLocal);

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    tempEl.innerHTML = "";
    windEl.innerHTML = "";
    humidityEl.innerHTML = "";
    forecast.innerHTML = "";
    userSearch = fromInput.value;
    getWeather(userSearch);
    fromInput.value = "";

})

