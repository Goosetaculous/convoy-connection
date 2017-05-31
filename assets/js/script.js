$(document).ready(function(){

    var cuisineArr = ["Asian", "Bubble Tea", "Cambodian", "Cantonese", "Chinese", "Dim Sum", "Filipino", "Fusion", "Japanese", "Korean", "Laotion", "Mongolian", "Nepalese", "Ramen", "Seafood", "Sushi", "Taiwanese", "Teriyaki", "Thai", "Vietnamese"]
    var zomatorAPI="https://developers.zomato.com/api/v2.1/"
    var zomatorKey="2764611985fca4aa535b451992f20776"
    var start = 1
    var allRestArr = [];
    //Initialize carousel
    $('.carousel').carousel();
    //initialize zomato

    function populateTable(restaurantInfo){
       var tr=$("<tr id='"+restaurantInfo.id+"' class='restaurant-name'><td>"+restaurantInfo.name+"</td><td>"+restaurantInfo.address+"</td><td>"+ restaurantInfo.cuisine+"</td><td>"+restaurantInfo.ratingNum +"</td><td>"+restaurantInfo.ratingVotes+"</td><td>"+restaurantInfo.ratingText+"</td></tr>")
           $("#restaurantList").append(tr).show()
    }



    function getReview(res_id){
        var test = "17076027"
        $.ajax({
            "async"         :   true,
            "crossDomain"   :   true,
            "url"           :   zomatorAPI+ "reviews?res_id="+test,
            "method"        :   "GET",
            "headers"       : {
                "Accept"    : "application/json",
                "user-key"  : zomatorKey
            }
        }).done(function(results){
            console.log(results)
        })

    }


    function zomatorSearch(){
        $.ajax({
            "async"         :   true,
            "crossDomain"   :   true,
            "url"           :   zomatorAPI+ "search?entity_id=302&entity_type=city&q=92111&start="+start+"&count=5",
            "method"        :   "GET",
            "headers"       : {
                "Accept"    : "application/json",
                "user-key"  : zomatorKey
            }
        }).done(function(results){
            traverseResults(results)
            getReview()
        })
    }

    function traverseResults(results){
        console.log("results",results.results_shown)

        for (var i = 0; i< results.results_shown; i++){
            var info={
                "id"               : results.restaurants[i].restaurant.id,
                "name"             : results.restaurants[i].restaurant.name,
                "address"          : results.restaurants[i].restaurant.location.address,
                "cuisine"          : results.restaurants[i].restaurant.cuisines,
                "ratingNum"        : results.restaurants[i].restaurant.user_rating.aggregate_rating,
                "ratingVotes"      : results.restaurants[i].restaurant.user_rating.votes,
                "ratingText"       : results.restaurants[i].restaurant.user_rating.rating_text
            }
            //if( cuisineArr.indexOf(info.cuisine) !== -1 ){
                populateTable(info)
            //}
        }


    }

    $("#load-more").on("click",function(){
        start= start +5
        zomatorSearch();
    })
    


    //initial load
    zomatorSearch()

});

