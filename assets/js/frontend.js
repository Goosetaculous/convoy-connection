$(document).ready(function(){

    $('.modal').modal();
    $('.carousel').carousel();
    $('.collapsible').collapsible();
    $('.onload-div').on("click",function(){
        $(this).hide("slow",function(){
            $('body').css("background-image", "url('https://static.pexels.com/photos/87390/chilli-pepper-sharp-spices-laos-87390.jpeg')");
            $('.hide-on-load').show(2000)

        })

    })


});
