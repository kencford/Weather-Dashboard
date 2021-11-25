console.log('Javascript code starts here.');

let searchHistory = [];
let apiKey = "60e388d13d87f9eee3a6915e90a44ff7";
let baseURL = "https://zoom.us/j/95811059840?pwd=OFVaVVRQaTdjVzYxMmdqN01wY2xoZz09"

const newLocal = "search-form";
let fromLabel = document.getElementById(newLocal);
let fromInput = document.getElementById("search-input");
let currentDiv = document.getElementById("today");
let forcastDiv = document.getElementById("forcast");
let searchHistoryDiv = document.getElementById("history");

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

// function handleSearchSubmit (event) {
//     console.log("in handleSearchSubmit");
//     console.log(fromInput.value);
//     // if (!fromInput.value) {
//     //     return;
//     // }
//     // event.preventDefault();
//     // let city = fromInput.value.trim();
//     // fetchCoordinates(city);
//     // fromInput.value = "";

// }

function handleSearchSubmit() {
    var x = document.getElementById("search-form");
    var text = "";
    var i;
    for (i = 0; i < x.length ;i++) {
      text += x.elements[i].value + "<br>";
    }
    // document.getElementById("demo").innerHTML = text;
    console.log("text ", text);
  }

  function myForm() {
    varjsx = document.forms["myjsForm"]["city"].value;
    if (jsx == "") {
        alert("Please fill the Name");
        return false;
    }
    console.log("city name: ", varjsx);
}

// fromLabel.addEventListener("submit", handleSearchSubmit);
