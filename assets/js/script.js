$(document).ready(function(){
    var zomatorAPI="https://developers.zomato.com/api/v2.1/"
    var zomatorKey="2764611985fca4aa535b451992f20776"
    var start = 1
    var allRestArr = [];
    //Initialize carousel
    $('.carousel').carousel();
    //initialize zomato

    function populateTable(restaurantInfo){
       var li = $("<li>" +
           "<div class='collapsible-header row' id='"+restaurantInfo.id+"'>" +
                "<div class='col s4'>"+restaurantInfo.name+"</div>" +
                "<div class='col s4'>"+restaurantInfo.address+"</div>" +
                "<div class='col s4'>"+ restaurantInfo.cuisine+"</div>" +
           "</div>" +
           "<div class='collapsible-body row'>" +
                "<div class='col s9' id='restaurant-men'>" +
                    "<span>Menu</span>" +
                "</div>" +
                "<div class='col s3'>" +
                    "<button data-target='modal1' class='btn' id='restaurant-rating'>Rating</button>" +
                "</div>" +
           "</div>" +
           "</li>")
           $(".restaurants-collection").append(li)
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
        //    console.log(results)
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
        for (var i = 0; i< results.results_shown; i++){
            var info={
                "id"               : results.restaurants[i].restaurant.id,
                "name"             : results.restaurants[i].restaurant.name,
                "address"          : results.restaurants[i].restaurant.location.address,
                "cuisine"          : results.restaurants[i].restaurant.cuisines,
                "ratingNum"        : results.restaurants[i].restaurant.user_rating.aggregate_rating,
                "ratingVotes"      : results.restaurants[i].restaurant.user_rating.votes,
                "ratingText"       : results.restaurants[i].restaurant.user_rating.rating_text,
                "latitude"         : results.restaurants[i].restaurant.location.latitude,
                "longitude"        : results.restaurants[i].restaurant.location.longitude
            }
            populateTable(info)
        }
    }

    function getRestaurantImage(res_id){
        $.ajax({
            "async"         :   true,
            "crossDomain"   :   true,
            "url"           :   zomatorAPI+ "restaurant?res_id="+res_id,
            "method"        :   "GET",
            "headers"       : {
                "Accept"    : "application/json",
                "user-key"  : zomatorKey
            }
        }).done(function(results){
            console.log("TEST->",results.featured_image)
            var img =  $("<img>").attr("src",results.featured_image )

            $(".restaurant-image").html(img)
        })


    }
  
    $("#load-more").on("click",function(){
        start= start +5
        zomatorSearch();
    })

    $("#restaurantList").on("click", ".restaurant-name",function(){
        console.log("TSET")
        getRestaurantImage( $(this).attr("id") )
        console.log($(this).attr("data-latitude"), $(this).attr("data-longitude") )

    })

    //initial load
    zomatorSearch()

});

