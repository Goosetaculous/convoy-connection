$(document).ready(function(){


    var settings = {
        async: true,
        crossDomain: true,
        url: "https://api.yelp.com/oauth2/token",
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        data: {
            client_id: "z2UQxENYU2tfHC8qDBhNFg",
            client_secret: "pkvMp9YG30GnouqQEspkge3YKp1h5f05ZnzzQGA35ImfV7reXfQy0qEt0fNIPS7P"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });

var map;
var response1;
var location;
var userPosition = {
  lat: 0,
  lng: 0
}

  //Grabs the search results from Google API
  function queryGMapsAPI () {
    $.ajax({
      url: "http://crossorigin.me/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.912618099999996,-117.1397224&radius=3500&type=restaurant&keyword=food&key=AIzaSyBBojALvC0zFv82BS2A16rIxnq_bBCl4pQ",
      method: "GET"
      }).done(function(response) {
      console.log(response);
      // Loops through the results array and places a marker for each
      for (var i = 0; i < 10; i++) {
        console.log(response);
        console.log(response.results[i].geometry.location);
        var coords = response.results[i].geometry.location;
        var latLng = new google.maps.LatLng(coords.lat,coords.lng);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map
          });
        }
      }
    )}

  function initMap() {
  //Initialize the map and set center and zoom
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: new google.maps.LatLng(32.912618099999996,-117.1397224),
    mapTypeId: 'terrain'
    });
  }


  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } 
    else { 
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    userPosition.lat = position.coords.latitude;
    userPosition.lng = position.coords.longitude;
    console.log(userPosition);
  }

getLocation();
initMap();
queryGMapsAPI();