$(function () {

    var loginForm = $("#pwdresetForm");

    validateChangePassword(loginForm);

    $("#submit").click(function (){


        if(loginForm.valid()){
            var newPassword = $("#newPassword").val();
            var  newPassword2 = $("#newPassword2").val();

            if(newPassword != newPassword2 ){
                alert("两次输入新密码不一致");
                return false;
            }

            ajaxSubmitCommon("pwdresetForm", "submit",window.base+"/pwdreset", {}, function (responseJson) {
                $('.theme-popover-mask').fadeOut(100);
                $('.theme-popover').slideUp(200);
                $("#username").val('');
                $("#password").val('');
                $("#newPassword").val('');
                $("#newPassword2").val('');
                $("#errorTip").show();
                $("#errorContent").html(responseJson.msg);
            }, function (responseJson) {
                $("#errorTip").show();
                $("#errorContent").html(responseJson.msg);
            }, function () {
                $("#errorTip").show();
                $("#errorContent").html("提交超时");
            });
        }

    })
});



function validateChangePassword(loginForm){
    loginForm.validate({
        rules: {
            "username": {
                required: true
            },
            "password": {
                required: true,
                minlength: 6,
                maxlength: 80
            },
            "newPassword": {
                required: true,
                minlength: 6,
                maxlength: 80
            },
            "newPassword2": {
                required: true,
                minlength: 6,
                maxlength: 80
            }
        },
        messages: {
            "username": {
                required: "请输入用户名",
                minlength: "最小6位",
                maxlength: "最长12位"
            },
            "password": {
                required: "请输入密码",
                minlength: "格式不正确（6-12位）",
                maxlength: "格式不正确（6-12位）"
            },
            "newPassword": {
                required: "请输入新密码",
                minlength: "格式不正确（6-12位）",
                maxlength: "格式不正确（6-12位）"
            },
            "newPassword2": {
                required: "请再次输入新密码",
                minlength: "格式不正确（6-12位）",
                maxlength: "格式不正确（6-12位）"
            }
        },
        errorClass: 'wrong',
        errorElement: 'span'
    });
}


function ajaxSubmitCommon(formId, buttonId, url, data, successCallback, errorCallback, timeOut) {
    var ajaxOptions = {
        url: url,
        type: 'post',
        data: data,
        dataType: 'json',
        timeout: 100000,
        cache: false,
        success: function (responseJson) {
            console.log(responseJson.success);
            $("#" + buttonId).removeAttr("disabled").removeAttr("style");
            if (responseJson.success) {
                successCallback(responseJson);
            } else {
                errorCallback(responseJson);
            }
        },
        error: function () {
            $("#" + buttonId).removeAttr("disabled").removeAttr("style");
            timeOut();
        }
    };
    $("#" + formId).ajaxSubmit(ajaxOptions);
    $("#" + buttonId).attr("disabled", "disabled").attr("style", "background: #B0B5B9;");
}