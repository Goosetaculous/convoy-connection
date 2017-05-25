$(document).ready(function(){


    $(".yelp").on("click",function(){
        var data = { "user" : "me!" };
        $.ajax({
            type: "POST",
            url: "https://api.yelp.com/oauth2/token",
            dataType:"",
            processData: false,
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(r) {
                console.log(r)
                alert(r)
            }

            });
    })




});
