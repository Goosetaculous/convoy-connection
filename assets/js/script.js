$(document).ready(function(){


    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.yelp.com/oauth2/token",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin":"http:https:github.com/Goosetaculous/convoy-connection/invitations",
            "cache-control": "no-cache",
            "postman-token": "9cd9b19a-52a7-de96-69e9-0cf241410c9c"
        },
        "data": {
            "client_id": "z2UQxENYU2tfHC8qDBhNFg",
            "client_secret": "pkvMp9YG30GnouqQEspkge3YKp1h5f05ZnzzQGA35ImfV7reXfQy0qEt0fNIPS7P"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });



});
