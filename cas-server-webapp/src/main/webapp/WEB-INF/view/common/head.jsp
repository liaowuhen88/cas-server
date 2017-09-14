<%@ page import="com.bm.insurance.cloud.util.Constant" %>
<%@ page import="com.bm.insurance.cloud.orm.entity.CustomerServiceUser" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    CustomerServiceUser customerServiceUser = (CustomerServiceUser) request.getSession().getAttribute(Constant.USER_KEY);
%>
<!--用户信息-->
<div id="header" class="header">
    <div class="logo"><a href="<%=request.getContextPath()%>/index"><img src="<%=request.getContextPath()%>/resources/images/logo.png" alt="" width="100"/></a></div>
    <a class="sign-out" href="javascript:void(0)" onclick="exit()" title="退出"></a>
    <div class="user_info">您好，<%=customerServiceUser.getCname()%></div>
</div>
<script>
    function exit() {
        $.post("<%=request.getContextPath()%>/api/logout", {}, function (response) {
            if (response.success) {
                window.location.href = "<%=request.getContextPath()%>/login";
            } else {
                alert(response.msg)
            }
        })
    }
</script>