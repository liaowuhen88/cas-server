<%@ page pageEncoding="UTF-8" %>
<%@ page contentType="text/html; charset=UTF-8" %>

<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>系统选择</title>
    <link rel="apple-touch-icon" href="apple-touch-icon.png"><!-- Place favicon.ico in the root directory -->
    <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/tube/styles/vendor.css">
    <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/tube/styles/main.css">
</head>
<body class="bg-gray"><!--[if lt IE 10]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade
    your browser</a> to improve your experience.</p>
<![endif]-->
<header class="header">
    <div class="container">
        <div class="logo"><img src="./images/logo.png" alt="" class="pic"> <span>豆包网统一登录平台</span></div>
        <nav class="nav"><a href="http://b.17doubao.com" title="豆包企业平台">豆包企业平台</a><span>/</span> <a href="http://www.17doubao.com" title="豆包网官网">豆包网官网</a></nav>
    </div>
</header>

<div class="container">
    <div class="title">修改密码</div>


    <div class="form form-pwdreset">

        <form  method="post" id="pwdresetForm" class="verification">

            <div style="display: none" id="errorTip" class="alert alert-warning alert-dismissible fade in" role="alert">
                <label class="form-item" >
                    <span id="errorContent"></span>

                </label>
            </div>

            <input type="hidden" name="lt" value="${loginTicket}"/>
            <label class="form-item" for="username">

               <span class="addon">用户名</span>
        <input
                type="text" name="username" value="" id="username" placeholder="输入用户名">

            </label>
        <label class="form-item" for="password">
            <span
            class="addon">原密码</span>
        <input type="password" name="password"  id="password" placeholder="原密码"></label>
        <label class="form-item"  for="newPassword">
            <span class="addon">新密码</span> <input type="password" name="newPassword" id="newPassword" value="" placeholder="新密码">

        </label>
        <label
            class="form-item" for="newPassword2"><span class="addon">确认新密码</span>
            <input type="password" name="newPassword2" id="newPassword2" value="" placeholder="确认新密码"></label>

        <div class="btn-group">

            <button type="button" class="btn btn-white" onclick="javascript:history.go(-1)">返回登录</button>
           <%-- <button type="button" class="btn btn-white" onclick="window.location.href='/login'">返回登录</button>--%>
            <button type="button" id="submit" class="btn btn-red" >确认修改</button>
        </div>

        </form>
    </div>
</div>

<script>
    window.base = "<%=request.getContextPath()%>";
</script>

<script src="<%=request.getContextPath()%>/resources/js/jquery.js"></script>
<script src="<%=request.getContextPath()%>/resources/plugin/form/jquery.form.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/security.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/jquery.validate.js"></script>
<script src="<%=request.getContextPath()%>/resources/myjs/doubaopwdreset.js"></script>
</body>
</html>