$(document).ready (function(){
    $("#btnHide").click(function(){
        $("h2").fadeOut(300);
    })
    //------------------------------------
    $("#btnShow").click(function(){
        $("h2").fadeIn();
    })
    //------------------------------------
    $("#btnToggle").click(function(){
        $("h2").fadeToggle(300);
    })
    $("h2").click(function(){
        $(this).fadeTo(200, 0.5, function(){
            $(this).fadeTo(500, 1); 
        });
    })
});