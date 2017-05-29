$(document).ready(function(){

    var coordinates=[32.750296, -117.171673]
    var term


    //Initialize carousel
    $('.carousel').carousel();
    //initialize zomato
    var zomatoAPI = {
        "async"     : true,
        "crossDomain": true,
        "url"       : "https://developers.zomato.com/api/v2.1/restaurant",
        "method"    : "GET",
        "headers"   : {
            "Accept": "application/json",
            "user-key": "2764611985fca4aa535b451992f20776"
        },
    }
    //initilize opentable
    //Opentable API is public
    var opentable={
        "url"   :"http://opentable.herokuapp.com/api/restaurants?",
        "city"  : "city=",
        "name"  : "name="
    }

    function callZomator(term){
        $.ajax(zomatoAPI).done(function (response){
            console.log(response)
        })
    }

    function callOpentable(term){

    }





    //Get the results from textbox
    $("#restaurant-search").keyup(function(event){
        callZomator( $(this).val() )
        callOpentable( $(this).val )
        //term =  $(this).val()
        console.log($(this).val())
    })


    $("#map").googleMap({
        zoom: 10, // Initial zoom level (optional)
        coords: coordinates, // Map center (optional)
        type: "ROADMAP" // Map type (optional)
    });











});
