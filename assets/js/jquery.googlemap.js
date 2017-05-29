var map;
var response1;
var location;
var userPosition = {
  lat: 0,
  lng: 0
}

var searchterm = "food";

  //Grabs the search results from Google API
  function queryGMapsAPI (searchterm) {
    initMap();
    $.ajax({
      url: "http://crossorigin.me/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.912618099999996,-117.1397224&radius=3500&type=restaurant&keyword="+searchterm+"&key=AIzaSyBBojALvC0zFv82BS2A16rIxnq_bBCl4pQ",
      method: "GET"
      }).done(function(response) {
      console.log(response);
      // Loops through the results array and places a marker for each
      for (var i = 0; i < 10; i++) {
        console.log(response);
        console.log(response.results[i].geometry.location);
        var coords = response.results[i].geometry.location;
        var name = response.results[i].name;
        var rating = response.results[i].rating;
        var latLng = new google.maps.LatLng(coords.lat,coords.lng);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          name: name,
          rating: rating
          });
        // Adds click event listener to re-center map, load up info onto display
         marker.addListener("click", function() {
          map.setCenter(this.getPosition());
          map.setZoom(16);
          var displayName = this.name;
          var displayRating = this.rating;
          $("#Gmaps-display").text("");
          $("#Gmaps-display").append(displayName);
          $("#Gmaps-display").append("</br>");
          $("#Gmaps-display").append(rating);
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

$(document).ready(function(){

 $("#google").on("click", function(event) {
    searchterm = $("#search").val();
    queryGMapsAPI(searchterm);
  });

  getLocation();
  initMap();
  queryGMapsAPI(searchterm);
});