var apiKeyMaps = require('./../.env').apiKeyMaps;
var apiKeyWeather = require('./../.env').apiKeyWeather;

function Retrieve() {}


Retrieve.prototype.getHumidity = function(city, displayFunction) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKeyWeather).then(function(response) {
    displayFunction(city, response.main.humidity);
  });
};

Retrieve.prototype.getElevation = function(latitude, longitude, displayFunction) {
  $.get("http://open.mapquestapi.com/elevation/v1/profile?key=" + apiKeyMaps + "&inFormat=kvp&latLngCollection=" + latitude + "," + longitude).then(function(response) {
    displayFunction(response.elevationProfile[0].height);
  });
};

Retrieve.prototype.getTemperature = function(city, displayFunction) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKeyWeather).then(function(response) {
    displayFunction(response.main.temp);
  });
};


exports.retrieveModule = Retrieve;
