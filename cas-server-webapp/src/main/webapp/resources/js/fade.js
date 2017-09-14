$(function(){

    function count(){
        var i = 0;
        var timeNumber = 5;
        if(i == 0){
            timeInval  = setInterval( function(){
                _gopay( );
            },1500)
        }
        if(i == 1){
            $("label.error").fadeOut(900);
        }
        i = i+1;
        function _gopay( ){
            if( timeNumber <= 0){
                clearInterval(timeInval);
                timeNumber = 5;
                return;
            }else{
                timeNumber--;
                if( timeNumber == 0 ){
                    $("label.error").fadeOut(900);
                }
            }
        }
    }

    count();
    $("input").focus(function(){
        count();
    });

    $("input").blur(function(){
        count();
    });

    $("button").click(function(){
        count();
    })
    $("input").click(function(){
        count();
    })

    $("#addBankBtn").click(function(){
        count();
    })

    $("a#submitBtn").click(function(){
        count();
    })

});

function loading(){
    var loading = '<div class="loadingbox">'+'<div class="loadingimg">'+'<img src="../images/loading1.gif"/>'+'</div></div>';
    $(document.body).append(loading);
}