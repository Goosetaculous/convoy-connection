$(document).ready(function(){


    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://developers.zomato.com/api/v2.1/categories",
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "user-key": "2764611985fca4aa535b451992f20776"
        },
        
     
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
    




});
