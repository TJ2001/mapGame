var apiKeyMaps = require('./../.env').apiKeyMaps;

$(document).ready(function() {
  console.log("hi");
  $.get("http://open.mapquestapi.com/elevation/v1/profile?key=" + apiKeyMaps + "&inFormat=kvp&latLngCollection=39.74012,-104.9849").then(function(response) {
    console.log(response);
    console.log("hi");

  });
});
