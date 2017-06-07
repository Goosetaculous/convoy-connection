	
	var clientID ="NFNMXLJK5TGPYKM4HOC1YQ2CZLJZQG4EQBVIMF3VZXBCISAG";
	var clientSecret ="1QAI34VV0Z4YM5EBX2ZTX5NV5T4SBXFHHUJZIWLOCRGXQ0CZ";
	var coordLat = "32.8"
	//242510000";
	var coordLong = "-117.1"
	//542920000";
	var venueIDTEST = "40a55d80f964a52020f31ee3"
	var restName = [];
	var foursquareAPI = "https://api.foursquare.com/v2/venues/"
	var queryURL = "search?query=" + restName +"&limit=1&ll="+coordLat+","+coordLong+"&client_id="+clientID+"&client_secret="+clientSecret+"&v=20170601"
	var foursquareAjax = {
			"async"			: true,
	      	"crossDomain"	: true,
	      	"url"			: foursquareAPI,
	      	"method"		: "GET",
	      	"dataType"		: "json"	
	}
	 
	// function getRestaurantImage(restName){
	// 	restName = $(".getName").closest()
	// 	console.log(rest)
 //        foursquareAjax.url = foursquareAPI + queryURL;
 //        $.ajax(foursquareAjax).done(function(results){
 //            	var results = results.response;
	//       		var restaurantName = results.response.venues[0].name;
	//       		var venueID = results.response.venues[0].id;
 //        })
 //    }
	
	
	
	function foursquareSearch(restName){
		foursquareAjax.url = foursquareAPI + queryURL
		$.ajax(foursquareAjax).done(function(blah){
	      		
	      		var results = blah.response;
	      		var restaurantName = blah.response.venues[0].name;
	      		var venueID = blah.response.venues[0].id;
	      		
	      		getRestaurantImage(venueID);
	           
	           
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
					$("#carousel_1").html(img)
					$("#carousel_2").html(img)
					$("#carousel_3").html(img)
					$("#carousel_4").html(img)
					$("#carousel_5").html(img)
	        }

	    })

	}

	$(".getName").on("click", function(){
		foursquareSearch( $(this).text() )

	})
	
	



	