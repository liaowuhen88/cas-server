<%--

    Licensed to Jasig under one or more contributor license
    agreements. See the NOTICE file distributed with this work
    for additional information regarding copyright ownership.
    Jasig licenses this file to you under the Apache License,
    Version 2.0 (the "License"); you may not use this file
    except in compliance with the License.  You may obtain a
    copy of the License at the following location:

      http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.

--%>
<%@ page session="true" %>
<%@ page pageEncoding="UTF-8" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!doctype html><html><head><meta charset="utf-8">
<meta name="description" content="">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>登录</title>
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<!-- Place favicon.ico in the root directory -->
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/tube/styles/vendor.css">
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/tube/styles/main.css">
</head><body><!--[if lt IE 10]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please
<a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->
<header class="header">
    <div class="container">
        <div class="logo">
            <img src="<%=request.getContextPath()%>/resources/tube/images/logo.png" alt="" class="pic">
            <span>豆包网统一登录平台</span></div>
        <nav class="nav">
            <a href="http://b.17doubao.com" title="豆包企业平台">豆包企业平台</a>
            <span>/</span>
            <a href="http://www.17doubao.com"
               title="豆包网官网">豆包网官网</a></nav>
    </div>
</header>
<div class="banner">
    <div class="container">

        <form:form method="post" id="fm1" cssClass="fm-v clearfix" commandName="${commandName}" htmlEscape="true">

            <input type="hidden" name="lt" value="${loginTicket}"/>
            <input type="hidden" name="execution" value="${flowExecutionKey}"/>
            <input type="hidden" name="_eventId" value="submit"/>

            <div class="form"><h1>登录</h1>
                <form:errors path="*" id="msg" cssClass="errors" element="div"/>

                <label class="form-item username" for="username">
                <i class="iconfont icon-username"></i>
                <input type="text" name="username" id="username" value=""
                       placeholder="用户名/手机号"></label>
                <label class="form-item password" for="password">
                    <i class="iconfont icon-password"></i>
                    <input type="password" name="password" id="password" value=""
                           placeholder="密码"></label>

                <button type="submit" name="submit" class="btn btn-red btn-fluid" id="loginBtn" data-toggle="popover">登
                    录
                </button>

                <a href="<%=request.getContextPath()%>/pwdreset.html" title="修改密码"
                        class="password-reset">修改密码</a>

            </div>


        </form:form>

    </div>
</div>

<script src="<%=request.getContextPath()%>/resources/js/jquery.js"></script>
<script src="<%=request.getContextPath()%>/resources/plugin/form/jquery.form.js"></script>

<script src="<%=request.getContextPath()%>/resources/js/security.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/jquery.validate.js"></script>
<script src="<%=request.getContextPath()%>/resources/myjs/login.js"></script>

</body></html>