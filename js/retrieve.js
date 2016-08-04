// apiKeyMaps should link to your api key for mapquest.  http://open.mapquestapi.com/ //
var apiKeyMaps = require('./../.env').apiKeyMaps;
//apiKeyWeather should link to your api key for OpenWeatherMaps Current weather data. http://openweathermap.org/
var apiKeyWeather = require('./../.env').apiKeyWeather;

function Retrieve() {
  this.question;
  this.answer;
}


Retrieve.prototype.getHumidity = function(city, displayFunction) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKeyWeather).then(function(response) {
    displayFunction(city, response.main.humidity);
  });
};

Retrieve.prototype.compareHumidity = function(questionCity, answerCity, gameObject) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + questionCity + '&appid=' + apiKeyWeather).then(function(questionResponse) {
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + answerCity + '&appid=' + apiKeyWeather).then(function(answerResponse) {
      console.log(answerResponse);
      gameObject.humidity(questionResponse.main.humidity, answerResponse.main.humidity);
    });
  });
};

Retrieve.prototype.getElevation = function(latitude, longitude, displayFunction) {
  $.get("http://open.mapquestapi.com/elevation/v1/profile?key=" + apiKeyMaps + "&inFormat=kvp&latLngCollection=" + latitude + "," + longitude).then(function(response) {
    displayFunction(response.elevationProfile[0].height);
  });
};

Retrieve.prototype.compareElevation = function(questionCity, answerCity, gameObject) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + questionCity + '&appid=' + apiKeyWeather).then(function(questionCityResponse) {
    $.get("http://open.mapquestapi.com/elevation/v1/profile?key=" + apiKeyMaps + "&inFormat=kvp&latLngCollection=" + questionCityResponse.coord.lat + "," + questionCityResponse.coord.lon).then(function(questionResponse) {
      $.get('http://api.openweathermap.org/data/2.5/weather?q=' + questionCity + '&appid=' + apiKeyWeather).then(function(answerCityResponse) {
        $.get("http://open.mapquestapi.com/elevation/v1/profile?key=" + apiKeyMaps + "&inFormat=kvp&latLngCollection=" + answerCityResponse.coord.lat + "," + answerCityResponse.coord.lon).then(function(answerResponse) {
          gameObject.elevation(questionResponse.elevationProfile[0].height, answerResponse.elevationProfile[0].height);
        });
      });
    });
  });
};

Retrieve.prototype.getTemperature = function(city, displayFunction, nextCity) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKeyWeather).then(function(response) {
    if(nextCity) {
      this.question = response.main.temp;
      displayFunction(nextCity);
    } else {
      this.answer =response.main.temp;
      console.log("question=" + this.question);
      console.log("answer=" + this.answer);
    displayFunction(city, response.main.temp);
    }
  });
};

Retrieve.prototype.compareTemperature = function(questionCity, answerCity, gameObject) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + questionCity + '&appid=' + apiKeyWeather).then(function(questionResponse) {
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + answerCity + '&appid=' + apiKeyWeather).then(function(answerResponse) {
      gameObject.temperature(questionResponse.main.temp, answerResponse.main.temp)

    });
  });
};

Retrieve.prototype.getLatitudeLongitude = function(city) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKeyWeather).then(function(response) {
    console.log(1);
    return [response.coord.lat, response.coord.lon];
  });
};

Retrieve.prototype.getAnswer = function(questionData, questionCity, answerCity, gameObject) {
  var returnArray = [];
  if (questionData === "elevation") {
    this.compareElevation(questionCity, answerCity, gameObject);
    // var questionCityCoordinates = this.getLatitudeLongitude(questionCity);
    // var questionElevation = this.getElevation(questionCityCoordinates[0], questionCityCoordinates[1]);
    // var answerCityCoordinates = this.getLatitudeLongitude(answerCity);
    // console.log(2);
    // var answerElevation = this.getElevation(answerCityCoordinates[0], answerCityCoordinates[1]);
    // returnArray.push(questionElevation, answerElevation);
  } else if (questionData === "temperature") {
    this.compareTemperature(questionCity, answerCity, gameObject);
    // var questionCityTemperature = this.getTemperature(questionCity, this.getTemperature, answerCity);
    // var answerCityTemperature = this.getTemperature(answerCity);
    // returnArray.push(questionCityTemperature, answerCityTemperature);
  } else if (questionData === "humidity") {
    this.compareHumidity(questionCity, answerCity, gameObject);
    // var questionCityHumidity = this.getHumidity(questionCity);
    // var answerCityHumidity = this.getHumidity(answerCity);
    // returnArray.push(questionCityHumidity, answerCityHumidity);
  }
};

exports.retrieveModule = Retrieve;
