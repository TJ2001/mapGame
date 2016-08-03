var apiKeyMaps = require('./../.env').apiKeyMaps;
var apiKeyWeather = require('./../.env').apiKeyWeather;
var Retrieve = require('./../js/retrieve.js').retrieveModule;
var Weather = require('./../js/process.js').weatherModule;

var ourRetriever = new Retrieve();
var ourWeather = new Weather();

var displayHumidity = function(city, humidityData) {
  $('.showWeather').text("The humidity in " + city + " is " + humidityData + "%");
}


$(document).ready(function() {
  $("form#getElevation").submit(function() {
    event.preventDefault();
    console.log("button is working");
    var longitude = $('#longitude').val();
    var latitude = $('#latitude').val();
    ourRetriever.getElevation(latitude, longitude);
  });

  $('#weatherLocation').click(function() {
    var city = $('#location').val();
    ourRetriever.getHumidity(city, displayHumidity);
  });

  $('#weatherTemp').click(function() {
    var city = $('#location').val();
    // $('#location').val("");

    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKeyWeather).then(function(response) {
      var tempKelvin = response.main.temp;
      var tempCelsius = ourWeather.kelvinToCelsius(tempKelvin);
      var tempFahrenheit = ourWeather.celsiusToFahrenheit(tempCelsius);
      var selectedTemp = 1;
      if ($("#temp-selector").val() === "celsius"){
        selectedTemp = tempCelsius;
      } else if ($("#temp-selector").val() === "fahrenheit") {
        selectedTemp = tempFahrenheit;
      } else {
        selectedTemp = tempKelvin;
      }

      $('.showWeather').text("The temperature in " + city + " is " + selectedTemp + " degrees " + $("#temp-selector").val());
    }).fail(function(error) {
      $('.showWeather').text(error.responseJSON.message);
   });
  });
});
