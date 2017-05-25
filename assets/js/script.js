$(document).ready(function(){


    $(".yelp").on("click",function(){
        var data = {
            "client_id": "z2UQxENYU2tfHC8qDBhNFg",
            "client_secret": "pkvMp9YG30GnouqQEspkge3YKp1h5f05ZnzzQGA35ImfV7reXfQy0qEt0fNIPS7P"
        }

        $.ajax({
            type: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("Access-Control-Allow-Origin", "*");
            },
            url: "https://api.yelp.com/oauth2/token",
            processData: false,
            contentType: 'application/x-www-form-urlencoded',
            data: JSON.stringify(data),
            success: function(r) {
                console.log(r)
                alert(r)
            }

            });
    })




});
