var apiKeyMaps = require('./../.env').apiKeyMaps;
var apiKeyWeather = require('./../.env').apiKeyWeather;
var Retrieve = require('./../js/retrieve.js').retrieveModule;
var Weather = require('./../js/process.js').weatherModule;
var GameLogic = require('./../js/gameLogic.js').gameLogicModule;

var ourRetriever = new Retrieve();
var ourWeather = new Weather();
var ourGame = new GameLogic();

var displayHumidity = function(city, humidityData) {
  $('.showWeather').text("The humidity in " + city + " is " + humidityData + "%");
};

var displayTemp = function(city, tempData) {
  var tempKelvin = tempData;
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
};

var displayElevation = function(elevation) {
  $(".elevation").text("the elevation is " + elevation);
};

var displayAnswer = function(question, input) {
  console.log(question + " " + input);
  $("#score-board").text(ourGame.getScore());
};

var displayQuestion = function(questionArray) {
  $("#cities-output").text("What city matches the " + questionArray[0] + " of " + questionArray[1] + "?");
};

$(document).ready(function() {
  $("form#getElevation").submit(function() {
    event.preventDefault();
    console.log("button is working");
    var longitude = $('#longitude').val();
    var latitude = $('#latitude').val();
    ourRetriever.getElevation(latitude, longitude, displayElevation);
  });

  $('#weatherLocation').click(function() {
    var city = $('#location').val();
    ourRetriever.getHumidity(city, displayHumidity);
  });

  $('#weatherTemp').click(function() {
    var city = $('#location').val();
    ourRetriever.getTemperature(city, displayTemp);
    // $('#location').val("");
  });

  $('#get-city').click(function() {
    var returnedCity = ourGame.getNextCity();
    console.log(returnedCity);
    $("#cities-output").text(returnedCity);
  });

  $('#get-question').click(function() {
    var questionArray = ourGame.getNextQuestion(displayQuestion);
    console.log(questionArray);

  });

  $('#submit-answer').click(function() {
    var answer = $('#answer').val();
    ourRetriever.getAnswer(ourGame.currentQuestion, ourGame.currentCity, answer, ourGame, displayAnswer);
  });

});
