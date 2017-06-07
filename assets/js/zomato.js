$(document).ready(function(){
    var zomatorAPI="https://developers.zomato.com/api/v2.1/"
    var zomatorKey="2764611985fca4aa535b451992f20776"
    var zomatoAjax={
        "async"         :   true,
        "crossDomain"   :   true,
        "method"        :   "GET",
        "headers"       : {
            "Accept"    : "application/json",
            "user-key"  : zomatorKey
        }
    }
    var start = 1  //ctr for pagination

    function populateTable(restaurantInfo){
        var li = $("<li>" +
            "<div class='collapsible-header row' res-id='"+restaurantInfo.id+"'>" +
            "<div class='col s4 getName'>"+restaurantInfo.name+"</div>" +
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
        zomatoAjax.url = zomatorAPI+ "reviews?res_id="+res_id
        $.ajax(zomatoAjax).done(function(results){
            $("#zomato-review").html("")
            for(var i = 0 ; i < 5; i++){
                var zomReviews = $("<p class = 'zomatoRestaurantReview'>")
                var zomRating = results.user_reviews[i].review.rating
                var zomText = results.user_reviews[i].review.review_text
                var zomUserName = results.user_reviews[i].review.user.name
                var zomDate = results.user_reviews[i].review.review_time_friendly
                zomReviews.append(zomRating);
                zomReviews.append(zomText);
                zomReviews.append(zomUserName);
                zomReviews.append(zomDate);
                $("#zomato-review").append(zomReviews);           
            }
        })
    }

    function zomatorSearch(){
        zomatoAjax.url = zomatorAPI+ "search?entity_id=302&entity_type=city&q=92111&start="+start+"&count=5"
        $.ajax(zomatoAjax).done(function(results){
            traverseResults(results)
            //getReview()
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
    /**
     * Need a location to place the featured image or just use the carousel
     * @param res_id
     */
    function getRestaurantImage(res_id){
        zomatoAjax.url = zomatorAPI+ "restaurant?res_id="+res_id
        $.ajax(zomatoAjax).done(function(results){
            console.log("TEST->",results.featured_image)
            var img =  $("<img>").attr("src",results.featured_image )
            $(".restaurant-image").html(img)
        })
    }
    /**
     * Will create a button to load more paginated by 5
     */
    $("#load-more").on("click",function(){
        start= start +5
        zomatorSearch();
    })
    //create the modal on click
    $(".restaurants-collection").on("click", ".collapsible-header",function(){
        getReview( $(this).attr("res-id") )
        var modal=$("<div id='modal1' class='modal bottom-sheet'>" +
            "<div class='modal-content' id='restaurant-reviews'>" +
            "<p>A bunch of id='restaurant-reviews'</p>" +
            "</div>" +
            "</div>")
    })

    //initial load
    zomatorSearch()
});