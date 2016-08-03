var apiKeyMaps = require('./../.env').apiKeyMaps;
var apiKeyWeather = require('./../.env').apiKeyWeather;
var Weather = require('./../js/weather.js').weatherModule;

$(document).ready(function() {
  $("form#getElevation").submit(function() {
    event.preventDefault();
    console.log("button is working");
    var longitude = $('#longitude').val();
    var latitude = $('#latitude').val();
      $.get("http://open.mapquestapi.com/elevation/v1/profile?key=" + apiKeyMaps + "&inFormat=kvp&latLngCollection=" + latitude + "," + longitude).then(function(response) {
        console.log(JSON.stringify(response));
        console.log(response);
        console.log(response.elevationProfile);
        console.log(response.elevationProfile[0]);
        console.log(response.elevationProfile[0].height);
        $(".elevation").text("the elevation is " + response.elevationProfile[0].height);
    });
  });

  var ourWeather = new Weather();
  $('#weatherLocation').click(function() {
    var city = $('#location').val();
    // $('#location').val("");
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKeyWeather).then(function(response) {
      $('.showWeather').text("The humidity in " + city + " is " + response.main.humidity + "%");
    }).fail(function(error) {
      $('.showWeather').text(error.responseJSON.message);
   });
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
