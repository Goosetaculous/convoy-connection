//Holds markers for map; global var to deal with Google Maps quirks
var markersArray = [];

//Initializes the map and sets center and zoom, takes user location
function initMap() {
  //Default map position is San Diego
  var userPosition = {
    lat: 32.8242510000,
    lng: -117.1542920000
  }
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: new google.maps.LatLng(userPosition.lat, userPosition.lng),
    mapTypeId: 'terrain'
  });
}

//Empties the array holding the map markers, clears the map
function clearOverlays(markersArray) {
  for (var i = 0; i < markersArray.length; i++ ) {
    markersArray[i].setMap(null);
    }
    markersArray.length = 0;
}

//Queries the Google Maps Places API, obtains place identity and basic details
//The API performs a text search using the full address of the restaurant as pulled from the html
function geoCoder(address) {
  $.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query="+address+"&type=restaurant&key=AIzaSyDb1dPGeHD13NV59mKWthv_ugMsnSh1N7w",
    method: "GET"
  }).done(function(response) {
    console.log(response);
    //Declares request, which holds data for subsequent API calls (default placeId for testing)
    var request = {
      placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
    };

    //Clears the marker with each response - only one displayed at a time
    clearOverlays(markersArray);

    //Grabs coordinates and placeID from the first item in the response array
    coords = response.results[0].geometry.location;
    request.placeId = response.results[0].place_id;

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
    //Centers the map on the marker
    map.setCenter(marker.position);
    getDetails(request);
  });
}

//Queries the Google Maps Places API, obtains detailed place response and adds to page
function getDetails(request) {
  $.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid="+request.placeId+"&key=AIzaSyDb1dPGeHD13NV59mKWthv_ugMsnSh1N7w",
    method: "GET"
  }).done(function(response) {
    var restaurantImages = [];
      //Assigns the photo URLs from the Google Maps API to array
      for (i = 0; i < 7; i++) {
        if (response.result.photos[i].photo_reference !== undefined) {
          restaurantImages.push(response.result.photos[i].photo_reference);
        }
      };

    //Grabs reviews from the Google Maps API and appends to the page
    var reviews = response.result.reviews;
    $("#google-review").html("");
      for (var i = 0; i < 5; i++) {
        var reviewPost = $("<p></p>");
        reviewPost.append(reviews[i].author_name);
        reviewPost.append("<br/>");
        reviewPost.append(reviews[i].relative_time_description);
        reviewPost.append("<br/>");
        reviewPost.append(reviews[i].rating);
        reviewPost.append("<br/>");
        reviewPost.append(reviews[i].text);
        $("#google-review").append(reviewPost);
        $("#google-review").append("<br/>")
      }

    //Adds images to the page from images array
      for (i = 0; i < 5; i++) {
        var currentLoop = i+1;
        $("#carousel_"+currentLoop).attr("src", "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+restaurantImages[i]+"&key=AIzaSyDb1dPGeHD13NV59mKWthv_ugMsnSh1N7w");
      };
  });
}

//Gets user's current location and initializes the map
function getLocation() {
  if (navigator.geolocation) {
    //Default map position is San Diego
    navigator.geolocation.getCurrentPosition(showPosition);
  } 
  else { 
    console.log("Geolocation is not supported by this browser.");
  }
}

//Callback function to store user position coordinates and initialize map
function showPosition(position) {
  var userPosition = {
    lat: 32.920125899999995,
    lng: -117.10881489999998
  }
  userPosition.lat = position.coords.latitude;
  userPosition.lng = position.coords.longitude;
  initMap();
  }

$(document).ready(function(){

  $(".restaurants-collection").on("click", ".collapsible-header",function() {
    document.getElementById( 'sidebar' ).style.display = 'block'
    var address = $(this).children();
    var address = encodeURI(address[2].innerText);
    console.log(address);
    geoCoder(address);
  });

  getLocation();
  initMap();
});