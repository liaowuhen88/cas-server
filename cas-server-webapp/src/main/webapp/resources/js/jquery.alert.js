(function(){ 
	window.alert = function(options) {
		options = options.toString().replace(/\\/g,'\\').replace(/\n/g,'<br />').replace(/\r/g,'<br />'); //解析alert内容中的换行符
		var alertdiv='<div id="alertdivbox" style="position: fixed; z-index: 99999; left: 0px; top: 0px; background: rgba(6,6,6,0.2); width: 100%; height: 100%;">'+'<div id="alertdiv">'+'<div id="alerttext">'+options+'</div>'+'<br /><input type="submit" name="button" id="alertbtn" value="确定"/></div></div>'; //自定义div弹窗
		$(document.body).append(alertdiv);  //动态加载div
		$("#alertdiv").css({"margin-left":$("#alertdiv").width()/2*(-1)-20,"margin-top":50*(-1)}); //设置偏移数值，实现div居中
		$("#alertdivbox").show(); //显示
		$("#alertdiv").show();
		$(".loadin").css("display", "block");
		$(".loadin").prev().attr("disabled","disabled");
		$(".loadin").prev().children().attr("disabled","disabled");

		$("#alertbtn").click(function(){
			$("#alertdivbox").remove();
			$("#alertdiv").remove();
			$(".loadin").css("display", "none");
			$(".loadin").prev().removeAttr("disabled");
			$(".loadin").prev().children().removeAttr("disabled");
		})
	}; 
})();