$(document).ready(function(){

    var cuisineArr = ["Asian", "Bubble Tea", "Cambodian", "Cantonese", "Chinese", "Dim Sum", "Filipino", "Fusion", "Japanese", "Korean", "Laotion", "Mongolian", "Nepalese", "Ramen", "Seafood", "Sushi", "Taiwanese", "Teriyaki", "Thai", "Vietnamese"]
    var allRestArr = [];

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
    function populateTable(restaurantInfo){
       var tr=$("<tr><td>"+restaurantInfo.name+"</td><td>"+restaurantInfo.address+"</td><td>"+ restaurantInfo.cuisine+"</td><td>"+restaurantInfo.ratingNum +"</td><td>"+restaurantInfo.ratingUsers+"</td><td>"+restaurantInfo.ratingText+"</td></tr>")
           $("#restaurantList").append(tr)
    }


    function callZomatoAPI() {
        $.ajax(zomatoAPI).done(function(results) {
            for(i = 0; i < 20; i++){
                var restaurantInfo = {
                    name: "",
                    address: "",
                    cuisine: "",
                    ratingNum: "",
                    ratingUsers: "",
                    ratingText: ""
                };

                console.log("------------------------------------");
                restaurantInfo.name = results.restaurants[i].restaurant.name;
                restaurantInfo.address = results.restaurants[i].restaurant.location.address;
                restaurantInfo.cuisine = results.restaurants[i].restaurant.cuisines;
                restaurantInfo.ratingNum = results.restaurants[i].restaurant.user_rating.aggregate_rating;
                restaurantInfo.ratingUsers = results.restaurants[i].restaurant.user_rating.votes;
                restaurantInfo.ratingText = results.restaurants[i].restaurant.user_rating.rating_text;
                console.log(restaurantInfo);
                allRestArr.push(restaurantInfo);
                populateTable(restaurantInfo)

            }
            //console.log(allRestArr);
            //Featured Image URL
            //console.log(results.restaurants[i].restaurant.featured_image);

        });
    }
    callZomatoAPI();
});

