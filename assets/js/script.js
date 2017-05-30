$(document).ready(function(){

    var coordinates=[32.750296, -117.171673]
    var otData
    
    var cuisineArr = ["Asian", "Bubble Tea", "Cambodian", "Cantonese", "Chinese", "Dim Sum", "Filipino", "Fusion", "Japanese", "Korean", "Laotion", "Mongolian", "Nepalese", "Ramen", "Seafood", "Sushi", "Taiwanese", "Teriyaki", "Thai", "Vietnamese"]
    var allRestArr = [];
    var restaurantInfo = {
      name: "",
      address: "",
      cuisine: "",
      ratingNum: "",
      ratingUsers: "",
      ratingText: ""
    };



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

    
  function callZomatoAPI() {
    $.ajax(zomatoAPI).done(function(results) {
      console.log(results);
      
      for(i = 0; i < 20; i++){
        console.log("------------------------------------");
        restaurantInfo.name = results.restaurants[i].restaurant.name;
        console.log("Name: " + restaurantInfo.name);
        restaurantInfo.address = results.restaurants[i].restaurant.location.address;
        console.log("Address: " + restaurantInfo.address);
        restaurantInfo.cuisine = results.restaurants[i].restaurant.cuisines;
        console.log("Cuisine: " + restaurantInfo.cuisine);
        restaurantInfo.ratingNum = results.restaurants[i].restaurant.user_rating.aggregate_rating;
        restaurantInfo.ratingUsers = results.restaurants[i].restaurant.user_rating.votes;
        restaurantInfo.ratingText = results.restaurants[i].restaurant.user_rating.rating_text;
        console.log(restaurantInfo.ratingNum + "/5 out of "+restaurantInfo.ratingUsers+ " user votes");
        console.log("Rated: " +restaurantInfo.ratingText);
        console.log("------------------------------------");
        console.log(restaurantInfo);
        allRestArr.push(restaurantInfo);
        
      }
      console.log(allRestArr);
      //Featured Image URL
      //console.log(results.restaurants[i].restaurant.featured_image);
      
    });
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

  callZomatoAPI();

});


