	
	var clientID ="NFNMXLJK5TGPYKM4HOC1YQ2CZLJZQG4EQBVIMF3VZXBCISAG";
	var clientSecret ="1QAI34VV0Z4YM5EBX2ZTX5NV5T4SBXFHHUJZIWLOCRGXQ0CZ";
	var coordLat = "32.8"
	//242510000";
	var coordLong = "-117.1"
	//542920000";
	var venueIDTEST = "40a55d80f964a52020f31ee3"
	var restname = encodeURI("dumpling inn");
	var foursquareAPI = "https://api.foursquare.com/v2/venues/"
	var queryURL = "search?query=" + restname +"&limit=1&ll="+coordLat+","+coordLong+"&client_id="+clientID+"&client_secret="+clientSecret+"&v=20170601"
	
	 
	
	
	
	
	function foursquareSearch(){
		$.ajax({
			"async"			: true,
	      	"crossDomain"	: true,
	      	"url"			: foursquareAPI + queryURL,
	      	"method"		: "GET",
	      	"dataType"		: "json"
	      
	      }).done(function(blah){
	      		
	      		var results = blah.response;
	      		var restaurantName = blah.response.venues[0].name;
	      		var venueID = blah.response.venues[0].id;
	      		
	      		//getRestaurantImage(venueID);
	           
	           
	        })
	  }




	    function getRestaurantImage(venueID){
	    		
	        $.ajax({
	            "async"			: true,
		      	"crossDomain"	: true,
		      	"url"			: foursquareAPI + venueID + "/photos?&ll="+coordLat+","+coordLong+"&client_id="+clientID+"&client_secret="+clientSecret+"&v=20170601",
		      	"method"		: "GET",
		      	"dataType"		: "json"
	        }).done(function(results){
	            console.log(results);
	            console.log(results.response.photos.items.length);
	            for(i = 0; i < results.response.photos.items.length; i++){
	            	var picPre = results.response.photos.items[i].prefix;
	            	var picSuff = results.response.photos.items[i].suffix;
	            	var picURL = picPre + "300x500" + picSuff;
					var img =  $("<img>").attr("src",picURL);
					$("#images").append(img)
	        }

	    })

	}
	//On click of li item
	getRestaurantImage()
	function getDetails(request) {
	  $.ajax({
	    url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid="+request.placeId+"&key=AIzaSyB6qH6xeCW77jF6Q78CuIGvbV001Io6pPo",
	    method: "GET"
	  }).done(function(response) {
	    var restaurantImages = [];
	      //Assigns the photo URLs from the Google Maps API to array
	      for (i = 0; i < 3; i++) {
	        restaurantImages.push(response.result.photos[i].photo_reference);
	      };

	    //Grabs reviews from the Google Maps API and appends to the page
	    var reviews = response.result.reviews;
	    $("#google-review").html("");
	      for (var i = 0; i < 5; i++) {
	        var reviewPost = $("<p></p>");
	        reviewPost.append(reviews[i].author_name);
	        reviewPost.append("<br/>");
	        reviewPost.append(reviews[i].relative_time_description);
	        reviewPost.append("<br/>");
	        reviewPost.append(reviews[i].rating);
	        reviewPost.append("<br/>");
	        reviewPost.append(reviews[i].text);
	        $("#google-review").append(reviewPost);
	        $("#google-review").append("<br/>")
	      }

	    //Adds images to the page from images array
	      for (i = 0; i < 5; i++) {
	        var currentLoop = i+1;
	        $("#carousel_"+currentLoop).attr("src", "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+restaurantImages[i]+"&key=AIzaSyB6qH6xeCW77jF6Q78CuIGvbV001Io6pPo");
	      };
	  });
	}


	


	    



	



	