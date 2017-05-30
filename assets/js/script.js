$(document).ready(function(){

    var coordinates=[32.750296, -117.171673]
    var otData


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
        $.ajax({
            method: "GET",
            url: opentable.url + opentable.name+term

        }).done(function(data){
            console.log(data.restaurants[0].lat,data.restaurants[0].lng)
        })
    }

    //Get the results from textbox
    $("#search").on("click",function(event){


        //Call Opentable API
        callOpentable( $("#restaurant-search").val() )



    })
})