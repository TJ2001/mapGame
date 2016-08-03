function GameLogic() {
  this.score = 0;
  this.cityIndex = 35;
}

var cities = ["Boston", "Portland", "Dubai", "Dublin", "Seattle", "Los Angeles", "Phoenix", "New York", "Chicago", "Honk Kong", "Tokyo", "Seoul", "Beijing", "Sao Paulo", "Mexico City", "Osaka", "Manila", "Mumbai", "Delhi", "Jakarta", "Lagos", "Kolkata", "Cairo", "Buenos Aires", "Rio de Janeiro", "Moscow", "Shanghai", "Karachi", "Paris", "London", "Istanbul", "Nagoya", "Ibiza", "Barcelona", "Orlando"];

var shuffleCities = function(cities) {
  var currentIndex = cities.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = cities[currentIndex];
    cities[currentIndex] = cities[randomIndex];
    cities[randomIndex] = temporaryValue;
  }
  return cities;
};

GameLogic.prototype.getNextCity = function() {
  if (this.cityIndex >= 35) {
    cities = shuffleCities(cities);
    this.cityIndex = 0;
  }
  console.log(cities);
  var returnCity = cities[this.cityIndex];
  this.cityIndex ++;
  return returnCity;
};


GameLogic.prototype.getScore = function() {
  return this.score * 10;
};

GameLogic.prototype.elevation = function(cityOneElevation, cityTwoElevation) {
  if(Math.abs(cityOneElevation - cityTwoElevation) < 200) {
    // this.score ++;
    return true;
  } else {
    return false;
  }
};

GameLogic.prototype.temperature = function(cityOneTemperature, cityTwoTemperature) {
  if(Math.abs(cityOneTemperature - cityTwoTemperature) < 15) {
    // this.score ++;
    return true;
  } else {
    return false;
  }
};

GameLogic.prototype.humidity = function(cityOneHumidity, cityTwoHumidity) {
  if(Math.abs(cityOneHumidity - cityTwoHumidity) < 10) {
    // this.score ++;
    return true;
  } else {
    return false;
  }
};


exports.gameLogicModule = GameLogic;
