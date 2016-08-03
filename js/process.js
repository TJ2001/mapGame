function Weather () {}

Weather.prototype.kelvinToCelsius = function(tempKelvin) {
  return tempKelvin - 273.15;
};

Weather.prototype.celsiusToFahrenheit = function(tempCelsius) {
  var tempFahrenheit = (tempCelsius * 1.8) + 32;
  return tempFahrenheit;
};


exports.weatherModule = Weather;
