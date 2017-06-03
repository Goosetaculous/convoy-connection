//Default map position is San Diego
var userPosition = {
  lat: 32.920125899999995,
  lng: -117.10881489999998
}

//Holds Google Maps markers as they are created
var markersArray = [];

//Default placeId query to Google Maps is San Diego
var request = {
  placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
  location: ""
};

//Initializes the map and sets center and zoom, takes user location
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: new google.maps.LatLng(userPosition.lat, userPosition.lng),
    mapTypeId: 'terrain'
  });
}

//Empties the array holding the map markers, clears the map
function clearOverlays() {
  for (var i = 0; i < markersArray.length; i++ ) {
    markersArray[i].setMap(null);
    }
  markersArray.length = 0;
}

//Queries the Google Maps Places API, obtains place identity and basic details
//The API performs a text search using the full address of the restaurant as pulled from the html
function geoCoder(address) {
  $.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query="+address+"&type=restaurant&key=AIzaSyB6qH6xeCW77jF6Q78CuIGvbV001Io6pPo",
    method: "GET"
  }).done(function(response) {

    //Clears the marker with each response - only one displayed at a time
    clearOverlays();

    //Grabs coordinates and place ID from the first item in the response array
    coords = response.results[0].geometry.location;
    request.placeId = response.results[0].place_id;
    request.location = response.results[0].geometry.location;

    //Adds a marker to the map with response info
    var name = response.results[0].name;
    var rating = response.results[0].rating;
    var latLng = new google.maps.LatLng(coords.lat,coords.lng);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      name: name,
      rating: rating
    });

    //Pushes marker to a global array. Cleared out with each iteration
    markersArray.push(marker);
    map.setCenter(marker.position);
    getDetails();
  });
}

//Queries the Google Maps Places API, obtains detailed place response and adds to page
function getDetails() {
  $.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid="+request.placeId+"&key=AIzaSyB6qH6xeCW77jF6Q78CuIGvbV001Io6pPo",
    method: "GET"
  }).done(function(response) {
    var restaurantImages = [];
      //Assigns the photos from the Google Maps API to variables
      for (i = 0; i < 3; i++) {
        restaurantImages.push(response.result.photos[i].photo_reference);
      };

    //Grabs reviews from the Google Maps API
    var reviews = response.result.reviews;
    var current_review;
    $("#reviews").html("");
      for (var i = 0; i < 5; i++) {
        var reviewPost = $("<div><div>");
        reviewPost.append(reviews[i].text);
        $("#reviews").append(reviewPost);
        $("#reviews").append("<br/>")
      }

    //Adds images to the page
    $("#photo1").attr("src", "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+restaurantImages[0]+"&key=AIzaSyB6qH6xeCW77jF6Q78CuIGvbV001Io6pPo");
    $("#photo2").attr("src", "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+restaurantImages[1]+"&key=AIzaSyB6qH6xeCW77jF6Q78CuIGvbV001Io6pPo");
    $("#photo3").attr("src", "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+restaurantImages[2]+"&key=AIzaSyB6qH6xeCW77jF6Q78CuIGvbV001Io6pPo");
  });
}

//Gets user's current location and initializes the map
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } 
  else { 
    console.log("Geolocation is not supported by this browser.");
  }
}

//Callback function to store user position coordinates and initialize map
function showPosition(position) {
  userPosition.lat = position.coords.latitude;
  userPosition.lng = position.coords.longitude;
  initMap();
  }

$(document).ready(function(){

  $("#restaurantList").on("click", ".restaurant-name", function(event) {
    var address = encodeURI($(this).closest('tr').find('td:eq(1)').text());
    geoCoder(address);
  });

  getLocation();
  initMap();
});