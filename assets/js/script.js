$(document).ready(function(){
    //Initialize carousel
    $('.carousel').carousel();
    //initialize zomato
    var zomato = {
        "async"     : true,
        "crossDomain": true,
        "url"       : "https://developers.zomato.com/api/v2.1/categories",
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











});
