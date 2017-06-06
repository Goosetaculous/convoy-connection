$(document).ready(function(){
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCYUONSm_e9oy0i8PJPaKIbA-cXEXHCqwk",
        authDomain: "convoyconnection.firebaseapp.com",
        databaseURL: "https://convoyconnection.firebaseio.com",
        projectId: "convoyconnection",
        storageBucket: "convoyconnection.appspot.com",
        messagingSenderId: "682523460431"
    };
    firebase.initializeApp(config);
    var database =firebase.database();
    $(".restaurants-collection").on("click", ".collapsible-header",function(){
        database.ref( $(this).attr("res-id") +"/").on("value",function(menu) {
            console.log(menu.val())
        })
    })


})

