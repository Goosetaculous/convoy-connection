$(document).ready(function(){

    var coordinates=[32.750296, -117.171673]
    var otData


    //Initialize carousel
    $('.carousel').carousel();
    //initialize zomato
    var zomatoAPI = {
        "async"     : true,
        "crossDomain": true,
        "url"       : "https://developers.zomato.com/api/v2.1/search?entity_id=302&entity_type=city&q=92111",
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

    // This runQuery function expects two parameters:
// (the number of articles to show and the final URL to download data from)
  function callZomatoAPI() {
    $.ajax(zomatoAPI).done(function(results) {
    // Logging the URL so we have access to it for troubleshooting
    console.log("------------------------------------");
    console.log("URL: " + zomatoAPI.url);
    console.log("------------------------------------");
    // Log the Zomato to console, where it will show up as an object
    console.log(results);
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


        //Call Zomato API



    })

});

callZomatoAPI();
