function initMap() {

    var center={lat:32.750296,lng: -117.171673}

    //Initialize the map variable
    var map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 15
    });

    // Marker
    var marker= new google.maps.Marker({
        position: center,
        map: map
    })
}
