$(function () {

    var btn = $("#loginButton");
    var pwdInput = $('#loginPassword');
    var loginForm = $("#loginForm");

    validateLogin(loginForm);

    /*btn.popover({
        content: "",
        container: "body",
        trigger: "manual",
        delay: {show: 100, hide: 500}
    });*/


    var ajaxOptions = {
        type: 'post',
        dataType: 'json',
        timeout: 100000,
        cache: false,
        success: function (responseJson) {
            if (responseJson.success) {
                location.href = window.base + "/index";
            } else {
                btn.attr("data-content", responseJson.msg);
                btn.popover("show");
                pwdInput.val('');
                btn.removeAttr("disabled");
                $(".loadin").hide();
            }
        },
        error: function () {
            btn.attr("data-content", "系统错误");
            btn.popover("show");
            pwdInput.val('');
            btn.removeAttr("disabled");
            $(".loadin").hide();
        }
    };

    btn.click(function () {
/*        var explorer =navigator.userAgent ;
        if(explorer.indexOf("Chrome") >= 0){
        }else{
            alert("Sorry,我们只支持Chrome内核的浏览器!");
            return false;
        }*/
        if (loginForm.valid()) {
            btn.attr("disabled", "disabled");
            $(".loadin").show();
            ajaxOptions.url = window.base + "/api/login";
            loginForm.ajaxSubmit(ajaxOptions);
        }
    });

    $('#loginUsername,#loginPassword').keydown(function (event) {
        if (event.keyCode == 13) {
            btn.trigger("click");
        }
    });

});


function validateLogin(loginForm){
    loginForm.validate({
        rules: {
            "username": {
                required: true,
                userTelEmail: true,
                minlength: 6,
                maxlength: 12
            },
            "password": {
                required: true,
                minlength: 6,
                maxlength: 80
            }
        },
        messages: {
            "username": {
                required: "请输入用户名",
                userTelEmail: "字母数字组合/手机/邮箱",
                minlength: "最小6位",
                maxlength: "最长12位"
            },
            "password": {
                required: "请输入密码",
                minlength: "格式不正确（6-12位）",
                maxlength: "格式不正确（6-12位）"
            }
        },
        errorClass: 'wrong',
        errorElement: 'h6'
    });

}
