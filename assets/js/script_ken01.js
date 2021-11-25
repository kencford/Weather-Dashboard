console.log('Javascript code starts here.');

let searchHistory = [];
let apiKey = "60e388d13d87f9eee3a6915e90a44ff7";
let baseURL = "https://zoom.us/j/95811059840?pwd=OFVaVVRQaTdjVzYxMmdqN01wY2xoZz09"
let currentDivEl = document.getElementById("current");

var dateToday = "(Nov 21, 2021)";
var urlIcon = "https://openweathermap.org/img/w/";
var icon = "10d";

var cityName = 'Atlanta';

var cityHistory = ['New York City', 'Philadelphia', 'Denver', 'Atlanta'];

var weatherToday = ['54.01F', '6.67 MPH', '46%', '0.47'];

var weatherBack1 = ['64.01F', '6.67 MPH', '26%', '0.47'];
var weatherBack2 = ['74.01F', '7.67 MPH', '36%', '0.57'];
var weatherBack3 = ['84.01F', '8.67 MPH', '46%', '0.67'];
var weatherBack4 = ['94.01F', '9.67 MPH', '56%', '0.77'];
var weatherBack5 = ['104.01F', '10.67 MPH', '96%', '0.87'];


const newLocal = "search-form";
let fromLabel = document.getElementById(newLocal);
// let fromInput = document.getElementById("search-input");
// let currentDiv = document.getElementById("today");
// let forcastDiv = document.getElementById("forcast");
// let searchHistoryDiv = document.getElementById("history");

function init() {
    console.log("cityHistory", cityHistory);
    console.log("cityName: ", cityName);
    console.log("weatherToday: ", weatherToday);
    console.log("weatherBack1: ", weatherBack1);
    console.log("weatherBack2: ", weatherBack2);
    console.log("weatherBack3: ", weatherBack3);
    console.log("weatherBack4: ", weatherBack4);
    console.log("weatherBack5: ", weatherBack5);
    displayToday();
}
init();

function displayToday () {
    let cardToday = document.createElement ("div");
    let bodyToday = document.createElement ("div");
    let dateIcon = document.createElement ("h2");
    let weatherIcon = document.createElement ("img");
    let tempEl = document.createElement ("p");
    let windEl = document.createElement ("p");
    let humidityEl = document.createElement ("p");
    let uvEl = document.createElement ("p");
    let uvButton = document.createElement("button");
    let iconURL = urlIcon + icon + ".png";

    cardToday.append(bodyToday);
    dateIcon.textContent = `${cityName} ${dateToday}`;
    weatherIcon.setAttribute("src", iconURL);
    dateIcon.append(weatherIcon);
    tempEl.textContent = `Temp: ${weatherToday[0]}`;
    windEl.textContent = `Wind: ${weatherToday[1]}`;
    humidityEl.textContent = `Humidity: ${weatherToday[2]}`;

    bodyToday.append(dateIcon, tempEl, windEl, humidityEl);
    uvEl.textContent = "UV index: ";
    if (weatherToday[3] < 3) {
        uvButton.classList.add("btn-success");
    } else if (weatherToday[3] < 7) {
        uvButton.classList.add("btn-warning");
    } else {
        uvButton.classList.add("btn-danger");
    }

    uvButton.textContent = weatherToday[3];
    uvEl.append(uvButton);
    cardToday.append(uvEl);
    currentDivEl.innerHTML = "";
    currentDivEl.append(cardToday);

}
function displayBack1 () {
    let cardToday = document.createElement ("div");
    let bodyToday = document.createElement ("div");
    let dateIcon = document.createElement ("h2");
    let weatherIcon = document.createElement ("img");
    let tempEl = document.createElement ("p");
    let windEl = document.createElement ("p");
    let humidityEl = document.createElement ("p");
    let uvEl = document.createElement ("p");
    let uvButton = document.createElement("button");
    let iconURL = urlIcon + icon + ".png";

    cardToday.append(bodyToday);
    dateIcon.textContent = `${cityName} ${dateToday}`;
    weatherIcon.setAttribute("src", iconURL);
    dateIcon.append(weatherIcon);
    tempEl.textContent = `Temp: ${weatherToday[0]}`;
    windEl.textContent = `Wind: ${weatherToday[1]}`;
    humidityEl.textContent = `Humidity: ${weatherToday[2]}`;

    bodyToday.append(dateIcon, tempEl, windEl, humidityEl);

    currentDivEl.innerHTML = "";
    currentDivEl.append(cardToday);

}

function fetchCoordinates (city) {
    console.log("I am in fetchCoordinates")
    let url = `${baseURL}/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`
    fetch (url)
        .then (function(response){
            console.log(response);
            if (!response[0]) {
                console.log ("city not found");
            } else {
                //add to history
            }

        })
        .catch (function (error){
            console.log(error);
        });
}

function handleSearchSubmit (event) {
    console.log("in handleSearchSubmit");
    console.log(fromInput.value);
    // if (!fromInput.value) {
    //     return;
    // }
    // event.preventDefault();
    // let city = fromInput.value.trim();
    // fetchCoordinates(city);
    // fromInput.value = "";

}

// fromLabel.addEventListener("submit", handleSearchSubmit);
