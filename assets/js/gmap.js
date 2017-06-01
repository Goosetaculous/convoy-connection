var map;

var userPosition = {
  lat: 32.920125899999995,
  lng: -117.10881489999998
}

var searchterm = "food";

var coords = {
    lat: 0,
    lng: 0
}

var markersArray = [];

var request = {
  placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
  location: ""
};

var address = "";

var imagereference;

  //Grabs the search results from Google API
  function queryGMapsAPI (searchterm) {
    initMap();
    $.ajax({
      url: "http://crossorigin.me/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+userPosition.lat+","+userPosition.lng+"&radius=3500&type=restaurant&keyword="+searchterm+"&key=AIzaSyBBojALvC0zFv82BS2A16rIxnq_bBCl4pQ",
      method: "GET"
      }).done(function(response) {
      console.log(response);
    })
  }

  function clearOverlays() {
  for (var i = 0; i < markersArray.length; i++ ) {
    markersArray[i].setMap(null);
  }
  markersArray.length = 0;
}

  function initMap() {
  //Initialize the map and set center and zoom, takes user location
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: new google.maps.LatLng(userPosition.lat, userPosition.lng),
    mapTypeId: 'terrain'
    });
  }

  //Reinitialize the map and set center and zoom, takes user input
  function reinitMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: new google.maps.LatLng(coords.lat,coords.lng),
    mapTypeId: 'terrain'
    });
  }

  function geoCoder(address) {
    $.ajax({
      url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query="+address+"&type=restaurant&key=AIzaSyB6qH6xeCW77jF6Q78CuIGvbV001Io6pPo",
      method: "GET"
      }).done(function(response) {
        clearOverlays();
        console.log(response);
        imageURL = response.results[0].photos[0].photo_reference;
        coords = response.results[0].geometry.location;
        request.placeId = response.results[0].place_id;
        request.location = response.results[0].geometry.location;
        var name = response.results[0].name;
        var rating = response.results[0].rating;
        var latLng = new google.maps.LatLng(coords.lat,coords.lng);
        var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        name: name,
        rating: rating
          });
        markersArray.push(marker);
        map.setCenter(marker.position);
        getDetails();
      });
    }

    function getDetails() {
      $.ajax({
      url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid="+request.placeId+"&key=AIzaSyB6qH6xeCW77jF6Q78CuIGvbV001Io6pPo",
      method: "GET"
      }).done(function(response) {
        console.log(response);
        console.log(response.result.photos[0].photo_reference);
        imagereference = response.result.photos[0].photo_reference;
        var reviews = response.result.reviews;
        var current_review;
        $("#reviews").html("");
          for (var i = 0; i < 5; i++) {
            console.log(reviews[i]);
            var reviewPost = $("<div><div>");
            reviewPost.append(reviews[i].text);
            $("#reviews").append(reviewPost);
            $("#reviews").append("<br/>")
          }
        getImage();
      });
    }

    function getImage() {
      $.ajax({
      url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+imagereference+"&key=AIzaSyB6qH6xeCW77jF6Q78CuIGvbV001Io6pPo",
      method: "GET"
      }).done(function(response) {
        console.log(response);
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
    initMap();
  }

  function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
      var place = results[0];
      console.log(place);
    }
  }

$(document).ready(function(){

 $("#search").on("click", function(event) {
    searchterm = $("#restaurant-search").val();
  });

  $("#restaurantList").on("click", ".restaurant-name", function(event) {
    var address = encodeURI($(this).closest('tr').find('td:eq(1)').text());
    geoCoder(address);
    console.log(address);
  });


  getLocation();
  initMap();
});