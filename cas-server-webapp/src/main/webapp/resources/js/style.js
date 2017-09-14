window.onload = function(){
    var views = $('#views');
    var view = views.find('li');
    var length = view.length;
    var rotateLeft = $('#rotateLeft');
    var prev = $('#prev');
    var next = $('#next');
    var rotateRight = $('#rotateRight');
    var pages = $('#pages');
    var viewW = $(window).width();
    var viewH = $(window).height();

    $(".views li:first").addClass("active").siblings().removeClass("active");


    // 总页数
    pages.find('.all').text(length);
    page();
    size(viewW,viewH);
    imgCenter(viewW,viewH);

    var iframesize = function(){
        var viewW = $(window).width();
        var viewH = $(window).height();

        var index = views.find('.active').index();

        views.css({
            left : -viewW*index + 'px'
        });

        size(viewW,viewH);
        imgCenter(viewW,viewH);
    }

    window.onresize = iframesize;
    //window.onload = iframesize;

    // 计算容器宽度
    function size(viewW,viewH){
        view.css('width',viewW).css('height',viewH);
        views.css('width',viewW*length).css('height',viewH);
    }

    // 图片居中
    function imgCenter(viewW,viewH){
        var img = view.find('img');
        for (var i = 0; i < length; i++) {
            var imgW = img.eq(i).width();
            var imgH = img.eq(i).height();

            if (imgW > viewW) {
                img.eq(i).css({
                    'top': (viewH-imgH)/2 + 'px',
                    'left':(viewW-imgW)/2 + 'px'
                });
            }else if (imgW <= viewW) {
                img.eq(i).css({
                    'top': (viewH-imgH)/2 + 'px',
                    'left':(viewW-imgW)/2 + 'px'
                });
                img.parent().css({
                    'text-align':'center'
                });
            }
        }
    }
    // 上一张
    prev.on('click',function(){
        var index = views.find('.active').index();
        var viewW = $(window).width();

        view.eq(index).removeClass('active');
        console.log(index);
        if (index === 0) {
            view.eq(length-1).addClass('active');
            views.animate({
                left : -viewW*(length-1) + 'px'
            });
        }else{
            view.eq(index - 1).addClass('active');
            views.animate({
                left : -viewW*(index-1) + 'px'
            });
        }
        page();
    });

    // 下一张
    next.on('click',function(){
        var index = views.find('.active').index();
        var viewW = $(window).width();
        view.eq(index).removeClass('active');
        if (index === (length - 1)) {
            view.eq(0).addClass('active');
            views.animate({
                left : '0px'
            });
        }else{
            view.eq(index + 1).addClass('active');
            views.animate({
                left : -viewW*(index+1) + 'px'
            });
        }
        page();
    });

    // 页数
    function page(){
        var index = views.find('li.active').index();
        var cont = pages.find('.which');
        cont.text(index + 1);
    }

    //顺时针旋转
    $("#rotateRight").on("click",function(){
        var rotateval;
        var currentRotateVal = $($(".active").find("img")).attr("rotateValue");
        if(undefined == currentRotateVal){
            rotateVal = 0;
        }else{
            rotateVal = currentRotateVal;
        }
        rotateVal = Number(rotateVal) + 90;

        $($(".active").find("img")).attr("rotateValue",rotateVal);
        if($(".active").find("img").is(".cc")){
            $($(".active").find("img")).css({"transform":"rotate("+rotateVal+"deg) scale(2)"});
        }else{
            $($(".active").find("img")).css({"transform":"rotate("+rotateVal+"deg)"});
        }
        if($(".active").find("img").is(".cc")){
            $($(".active").find("img")).css({"transform":"rotate("+rotateVal+"deg) scale(2)"});
        }else{
            $($(".active").find("img")).css({"transform":"rotate("+rotateVal+"deg)"});
        }
    });

    //放大顺时针旋转
    $("#rotateRights").on("click",function(){
        var rotateval;
        var currentRotateVal = $($(".active").find("img")).attr("rotateValue");
        if(undefined == currentRotateVal){
            rotateVal = 0;
        }else{
            rotateVal = currentRotateVal;
        }
        rotateVal = Number(rotateVal) + 90;

        $($(".active").find("img")).attr("rotateValue",rotateVal);
        if($(".active").find("img").is(".cc")){
            $($(".active").find("img")).css({"transform":"rotate("+rotateVal+"deg) scale(2)"});
        }else{
            $($(".active").find("img")).css({"transform":"rotate("+rotateVal+"deg)"});
        }
        if($(".active").find("img").is(".cc")){
            $($(".active").find("img")).css({"transform":"rotate("+rotateVal+"deg) scale(2)"});
        }else{
            $($(".active").find("img")).css({"transform":"rotate("+rotateVal+"deg)"});
        }
    });

    //逆时针旋转
    $("#rotateLeft").on("click",function(){
        var rotateval;
        var currentRotateVal = $($(".active").find("img")).attr("rotateValue");
        if(undefined == currentRotateVal){
            rotateVal = 0;
        }else{
            rotateVal = currentRotateVal;
        }
        rotateVal = Number(rotateVal) - 90;
        $($(".active").find("img")).attr("rotateValue",rotateVal);

        if($(".active").find("img").is(".cc")){
            $($(".active").find("img")).css({"transform":"rotate("+rotateVal+"deg) scale(2)"});
        }else{
            $($(".active").find("img")).css({"transform":"rotate("+rotateVal+"deg)"});
        }

    });

    //放大逆时针旋转
    $("#rotateLefts").on("click",function(){
        var rotateval;
        var currentRotateVal = $($(".active").find("img")).attr("rotateValue");
        if(undefined == currentRotateVal){
            rotateVal = 0;
        }else{
            rotateVal = currentRotateVal;
        }
        rotateVal = Number(rotateVal) - 90;
        $($(".active").find("img")).attr("rotateValue",rotateVal);

        if($(".active").find("img").is(".cc")){
            $($(".active").find("img")).css({"transform":"rotate("+rotateVal+"deg) scale(2)"});
        }else{
            $($(".active").find("img")).css({"transform":"rotate("+rotateVal+"deg)"});
        }

    });
    //点击放大
    var ee = document.getElementById("views").getElementsByTagName("img");
    for(var i=0; i<ee.length; i++){
        ee[i].index = i;
        ee[i].onclick=function(){
            var srcimg = $(this).attr("src");
            var srcW = $(this).width();
            var html = "<div class='alew'><div class='alew_bg'></div><div class='alew_title active'><img src="+srcimg+"></div></div>";
            $("#divimg").html(html);
            $(".alew_title img").css({"width":srcW*2+"px"});
            $("#divimg-btn").show();
            $(".preview").hide();
        }
    }

    $("#divimg").on("click",function(){
        $("#divimg").empty();
        $("#divimg-btn").hide();
        $(".preview").show();
    })

}
