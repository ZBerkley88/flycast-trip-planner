async function getflight() {
    console.log("the click worked");
    var apikey = "63586b5d9b2ba32332d8eed0";
    var frominput = document.querySelector("#frominput").value.trim();
    var toinput = document.querySelector("#toinput").value.trim();
    var departureDate = document.querySelector("#departdate").value.trim();
    var numberAdults = document.querySelector("#adults").value.trim();
    var numberChildren = document.querySelector("#children").value.trim();
    console.log("From " + frominput);
    console.log("To " + toinput);
    //"https://api.flightapi.io/place/api-key/london"
    //From location
    https: var getFrom = "https://api.flightapi.io/iata/"+apikey+"?name="+frominput+"&type=airport";
    var response = await fetch(getFrom)
    var result = await response.json();
    console.log(result);
    console.log(result.data[0].fs + " is the IATA of the To location");
    var fromIATA = result.data[0].fs;
    //To location
    https: var getTo = "https://api.flightapi.io/iata/"+apikey+"?name="+toinput+"&type=airport";
    var response = await fetch(getTo)
    var result = await response.json();
    console.log(result);
    console.log(result.data[0].fs + " is the IATA of the From location");
    var toIATA = result.data[0].fs;
    //https://api.flightapi.io/roundtrip/YOURAPIKEY/LHR/LAX/2019-10-11/2019-10-15/2/0/1/Economy/USD
    https: var getFlight = "https://api.flightapi.io/onewaytrip/"+apikey+"/"+fromIATA+"/"+toIATA+"/"+departureDate+"/"+numberAdults+"/"+numberChildren+"/0/Economy/USD";
    var response = await fetch(getFlight)
    var result = await response.json();
    var tripId = result.fares[0].tripId;
    //Departure Airport
    var fromAirport = document.getElementById("fromairport");
    if (tripId.includes("G4")) {
        fromAirport.textContent = "Allegiant Air LLC"
    } else if (tripId.includes("AA")) {
        fromAirport.textContent = "American Airlines"
    } else if (tripId.includes("DL")) {
        fromAirport.textContent = "Delta Air Lines"
    } else if (tripId.includes("9E")) {
        fromAirport.textContent = "Endeavor Air"
    } else if (tripId.includes("YV")) {
        fromAirport.textContent = "Mesa Airlines"
    } else if (tripId.includes("OH")) {
        fromAirport.textContent = "PSA Airlines"
    } else if (tripId.includes("OO")) {
        fromAirport.textContent = "SkyWest Airlines"
    } else if (tripId.includes("NK")) {
        fromAirport.textContent = "Spirit Airlines"
    } else if (tripId.includes("UA")) {
        fromAirport.textContent = "United Airlines"
    } else fromAirport.textContent = "Airplane Airlines";
    console.log(fromAirport.textContent);
    //Price
    var flightInfoDiv = document.getElementById("price");
    var flightPrice = result.fares[0].price.totalAmount;
    flightInfoDiv.textContent = ("$" + flightPrice);
    console.log("$" + flightPrice)
    //Link
    var flightLink = document.getElementById("bookinglink");
    flightLink.href = result.fares[0].handoffUrl;
    flightLink.textContent = "Booking Site";
    console.log(result.fares[0].handoffUrl);
}

function fivedaydates() {
    //var tDate = moment().local().format("ddd, MMM Do");
    $("#todayplusone").text(moment().add(1,'days').local().format("ddd, MMM Do"))
    $("#todayplustwo").text(moment().add(2,'days').local().format("ddd, MMM Do"))
    $("#todayplusthree").text(moment().add(3,'days').local().format("ddd, MMM Do"))
    $("#todayplusfour").text(moment().add(4,'days').local().format("ddd, MMM Do"))
    $("#todayplusfive").text(moment().add(5,'days').local().format("ddd, MMM Do"))
}

async function getWeather() {
    console.log("The click worked");
    var images = document.getElementsByTagName("img");
    //var i;
    for(i = 0; i < images.length; i++) {
        images[i].classList.add("hide");
    }
    var apikey = "f35f15ca2adc937d3e6afe2f22b4ba44";
    var searchInput = document.querySelector("#toinput").value.trim();
//Coordinates
    https: var getCoordinates = "https://api.openweathermap.org/geo/1.0/direct?q="+searchInput+"&appid=f35f15ca2adc937d3e6afe2f22b4ba44&units=metric";
    var coordinateData = await fetch(getCoordinates);
    var data = await coordinateData.json();
    console.log(data);
    var coordinates = data[0];
    var {lat, lon} = coordinates;
    var {name, state} = coordinates;
    https: var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=f35f15ca2adc937d3e6afe2f22b4ba44&units=imperial&cnt=5";
    var response = await fetch(forecastUrl)
    var result = await response.json()
    var resultarray = Object.values(result);
    var forecast = resultarray[3];
    console.log("IM RIGHT HERE");
    console.log(forecast);
    //One day out
    var oneday = forecast[0];
    var icon = oneday.weather[0].icon;
    var {temp} = oneday.main;
    var {humidity} = oneday.main;
    var {speed} = oneday.wind;
    var tempround = Math.round(temp);
    var windround = Math.round(speed);
    var img = document.createElement("img");
    img.src="http://openweathermap.org/img/wn/"+icon+"@2x.png"
    document.getElementById("todayplusone").appendChild(img);
    document.getElementById("onetemp").textContent = tempround + "°F";
    document.getElementById("onehumid").textContent = humidity + "% Humidity";
    document.getElementById("onewind").textContent = windround + "mph Winds";
//Two days out
    var twodays = forecast[1];
    var icon = twodays.weather[0].icon;
    var {temp} = twodays.main;
    var {humidity} = twodays.main;
    var {speed} = twodays.wind;
    var tempround = Math.round(temp);
    var windround = Math.round(speed);
    var img = document.createElement("img");
    img.src="http://openweathermap.org/img/wn/"+icon+"@2x.png"
    document.getElementById("todayplustwo").appendChild(img);
    document.getElementById("twotemp").textContent = tempround + "°F";
    document.getElementById("twohumid").textContent = humidity + "% Humidity";
    document.getElementById("twowind").textContent = windround + "mph Winds";
//Three days out
    var threedays = forecast[2];
    var {temp} = threedays.main;
    var {humidity} = threedays.main;
    var {speed} = threedays.wind;
    var tempround = Math.round(temp);
    var windround = Math.round(speed);
    var img = document.createElement("img");
    img.src="http://openweathermap.org/img/wn/"+icon+"@2x.png"
    document.getElementById("todayplusthree").appendChild(img);
    document.getElementById("threetemp").textContent = tempround + "°F";
    document.getElementById("threehumid").textContent = humidity + "% Humidity";
    document.getElementById("threewind").textContent = windround + "mph Winds";
//Four days out 
    var fourdays = forecast[3];
    var {temp} = fourdays.main;
    var {humidity} = fourdays.main;
    var {speed} = fourdays.wind;
    var tempround = Math.round(temp);
    var windround = Math.round(speed);
    var img = document.createElement("img");
    img.src="http://openweathermap.org/img/wn/"+icon+"@2x.png"
    document.getElementById("todayplusfour").appendChild(img);
    document.getElementById("fourtemp").textContent = tempround + "°F";
    document.getElementById("fourhumid").textContent = humidity + "% Humidity";
    document.getElementById("fourwind").textContent = windround + "mph Winds";
//Five days out
    var fivedays = forecast[4];
    var {temp} = fivedays.main;
    var {humidity} = fivedays.main;
    var {speed} = fivedays.wind;
    var tempround = Math.round(temp);
    var windround = Math.round(speed);
    var img = document.createElement("img");
    img.src="http://openweathermap.org/img/wn/"+icon+"@2x.png"
    document.getElementById("todayplusfive").appendChild(img);
    document.getElementById("fivetemp").textContent = tempround + "°F";
    document.getElementById("fivehumid").textContent = humidity + "% Humidity";
    document.getElementById("fivewind").textContent = windround + "mph Winds";
    document.getElementById("forecast").classList.remove("hide");
    var savedSearches = JSON.parse(localStorage.getItem("savedSearches")) || [];
    var searchedCity = name;
    var searchedObject = {
        name: searchedCity,
        city: searchedCity
    };
    savedSearches.push(searchedObject);
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
    var searches = JSON.parse(window.localStorage.getItem('savedSearches')) || [];
    console.log(searches);
    var uniquesearches = [];
    var unique = searches.filter(element => {
        var isDuplicate = uniquesearches.includes(element.name);
        if (!isDuplicate) {
            uniquesearches.push(element.name);
            return true;
        }
        return false;
    });
    var optionsToDelete = document.querySelectorAll("option");
    console.log(optionsToDelete);
    for (i = 0; i < optionsToDelete.length; i++) {
        optionsToDelete[i].parentNode.removeChild(optionsToDelete[i])
    }
    for (var i = 0; i < unique.length; i++) {
        var option = document.createElement('option');
        option.textContent = unique[i].name;
        var div = document.getElementById('history');
        div.appendChild(option);
    }
    var searchInput = document.querySelector("#toinput");
    searchInput.value = "";
}

/*
function showModal() {
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
modal.style.display = "block";
span.onclick = function() {
  modal.style.display = "none";
}
}
*/

function showModal() {
    myModal.style.display = "block";
    console.log('my modal is showing up');
}

function closeModal() {
    myModal.style.display = "none";
    console.log("close function working");
}
    

//Submit button onclick events
var searchButton = document.querySelector("#submitbtn");
searchButton.addEventListener("click", () => {getflight(); getWeather(); fivedaydates(); showModal();});

var myModal = document.getElementById('myModal');
var modalClose = document.querySelector('close');
modalClose.addEventListener("click", closeModal);