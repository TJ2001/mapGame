var apiKeyMaps = require('./../.env').apiKeyMaps;
var apiKeyWeather = require('./../.env').apiKeyWeather;

function Retrieve() {}


Retrieve.prototype.getHumidity = function(city, displayFunction) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKeyWeather).then(function(response) {
    displayFunction(city, response.main.humidity);
  }).fail(function(error) {
    $('.showWeather').text(error.responseJSON.message);
 });
};

Retrieve.prototype.getElevation = function(latitude, longitude) {
  $.get("http://open.mapquestapi.com/elevation/v1/profile?key=" + apiKeyMaps + "&inFormat=kvp&latLngCollection=" + latitude + "," + longitude).then(function(response) {
    console.log(response.elevationProfile[0].height);
    $(".elevation").text("the elevation is " + response.elevationProfile[0].height);
});
};

Retrieve.prototype.getTemperature = function(city, displayFunction) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKeyWeather).then(function(response) {
    displayFunction(city, response.main.temp);
  });
};


exports.retrieveModule = Retrieve;
